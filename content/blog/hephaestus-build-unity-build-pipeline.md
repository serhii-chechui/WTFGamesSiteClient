---
title: "One build script for every Unity project: Hephaestus Build"
description: "Every one of our Unity games used to carry its own BuildScript.cs, copied from the previous game. Hephaestus Build replaces them with one package: the same menu, the same CI entry points and the same App Store fixes in every project, with room for project-specific code."
date: 2026-10-07
slug: hephaestus-build-unity-build-pipeline
cover: cover.jpg
coverAlt: "Close-up of a circuit board lit like a city at night, with glowing amber components"
lang: en
tags: [Unity, CI/CD, Hephaestus]
draft: true
---

Every Unity game we shipped had a file called `BuildScript.cs`. Nobody wrote it from scratch: it was copied from the previous game, renamed a little and patched until the build went through. After a few years VirusHunt, Spaceglider and Robodancer each had their own version, and no two of them did quite the same thing.

Hephaestus Build is what replaced them. It is a small editor package, part of our Hephaestus framework for Unity, that builds the player for iOS, Android, macOS and Windows the same way in every project. This article explains why we made it, where it saves time and how a project adds its own steps without forking it.

## The problem with a build script per project

A copied build script looks harmless. It is a hundred lines of code that call `BuildPipeline.BuildPlayer`. The trouble is in what each copy forgets.

Here is what we found when we compared the scripts:

- **A failed build that looked green.** VirusHunt's iOS build logged `❌ iOS build failed` and returned. In batch mode Unity then quit with exit code 0, so CI marked the step as passed and only failed later, in Xcode, with a much less useful error.
- **Fixes that never travelled.** One project learned that App Store Connect rejects app icons with an alpha channel and added a post-processor to strip it. The next project hit the same rejection a year later.
- **Different answers to the same question.** Where does the build go? Which scenes are included? Is the Xcode folder wiped first? Is Addressables content rebuilt? Each script had its own answer, and the CI job had to know it.
- **Secrets in the wrong place.** Android keystore passwords lived in Player Settings, or were typed in before each release build.
- **Two post-processors fighting.** A project's `iOSPostBuildProcessor.cs` and a plugin's processor wrote the same Info.plist keys, and the result depended on callback order.

None of these is hard to fix. The cost is that every project has to fix it again.

## What Hephaestus Build is

It is a UPM package, `com.wtfgames.hephaestus.build`, for Unity 6. After installing it, every project gets the same **Hephaestus → Build** menu:

| Menu item    | Output                                         |
|--------------|------------------------------------------------|
| iOS          | `Build/iOS`, an Xcode project, folder cleaned first |
| iOS (Append) | `Build/iOS`, appended into the existing Xcode project |
| Android      | `Build/Android/<productname>.aab` (or `.apk`)  |
| macOS        | `Build/macOS/<ProductName>.app`                |
| Windows      | `Build/Windows/<ProductName>.exe` (64-bit)     |
| Settings     | Selects the project's settings asset           |

The same builds are available to CI as parameterless methods:

```bash
Unity -batchmode -quit -projectPath . -buildTarget iOS \
  -executeMethod WTFGames.Hephaestus.BuildSystem.Editor.BuildScript.BuildIOS -logFile -
```

The scenes are the enabled ones in Build Profiles, and the output always goes to `Build/<platform>` in the project root. Any failure logs a clear message and, in batch mode, exits with code 1.

## One approach in every project

The point of the package is not the code inside it but the conventions it fixes in place. When every project builds the same way, everything around the build can be shared too.

Our Jenkins pipeline is the clearest example. The `Jenkinsfile` is now the same file in every Unity project. It knows that the iOS build method is `BuildScript.BuildIOS`, that the Xcode project is in `Build/iOS` and that the Android bundle is in `Build/Android`. Everything that differs between games lives in a `ci.properties` file next to it: the version, the bundle ID, the provisioning profile names and the IDs of the Jenkins credentials.

```properties
APP_VERSION=1.5.1
IOS_TEAM_ID=...
IOS_PROFILE_APP_STORE=virushunt_production
ANDROID_KEYALIAS_NAME=virushunt
# Empty: Hephaestus Build
IOS_BUILD_METHOD=
ANDROID_BUILD_METHOD=
```

Setting up CI for a new game is now a matter of filling in that file, not of reading its build script to find out where it puts things.

The same holds inside the editor. A developer who opens any of our projects finds the build under the same menu, with the same settings asset, and gets the same result. There is nothing project-specific to learn before making a release build.

## Where it saves time

Most of the savings come from problems that no longer happen, and so are hard to measure. These are the ones that used to cost us an afternoon each.

**Addressables built before the player.** In projects that use Addressables, the content is built (or clean-built) for the target platform first. If the content build fails, the player is not built. Forgetting this step produces a build that installs fine and then fails to load its content. The step is skipped in projects without Addressables, and when Addressables are already set to build together with the player, so the content is never built twice.

**Clean iOS builds by default.** Building into an existing Xcode project is faster, but we have repeatedly seen it break framework linking after an SDK update. The default iOS build wipes the folder first. **iOS (Append)** is there when speed matters and the previous build is known to be good.

**An Xcode project that App Store Connect accepts.** A post-processor applies the settings that used to be fixed by hand in Xcode, or after a rejection email:

- the app category (`APP_CATEGORY_TYPE`), for example Arcade Games;
- `ITSAppUsesNonExemptEncryption`, so App Store Connect stops asking about export compliance for every build;
- `NSUserTrackingUsageDescription` for the App Tracking Transparency prompt, when the game needs one;
- extra system frameworks linked into `UnityFramework`, for native plugins that need them;
- app icons re-encoded without an alpha channel.

**Android signing without secrets in the repository.** The keystore passwords come from the `ANDROID_KEYSTORE_PASSWORD` and `ANDROID_KEYALIAS_PASSWORD` environment variables, which Jenkins fills from its credentials store. The default output is an `.aab` with the native symbol table, which Google Play needs for readable crash reports. A build signed with the debug keystore logs a warning, because Google Play will not accept it.

**Mistakes reported early and clearly.** If the platform's build support module is missing, or the editor's active build target is not the one being built, the build stops at once with a message saying what to do (for example, "Start Unity with `-buildTarget iOS`"). In the editor, the menu offers to switch the platform instead.

**Less code to maintain.** Moving VirusHunt to the package deleted its `BuildScript.cs` and `iOSPostBuildProcessor.cs`, about 130 lines, and added a 25-line settings asset. A bug fixed in the package is fixed in every game at its next package update.

## Extending it in a project

A shared build is only useful if a project can still do something unusual. Hephaestus Build does not try to cover every case with settings. It leaves four ways to add project-specific behaviour, from the simplest to the most flexible.

### 1. The settings asset

**Hephaestus → Build → Settings** creates `HephaestusBuildSettings.asset` in the project. It holds the values that legitimately differ between games: the output folder, whether to clean it, how to build Addressables, the iOS app category, the tracking description, extra frameworks, the icon background colour, `.aab` or `.apk` and the level of Android debug symbols. Without the asset, the defaults apply.

This covers most projects. VirusHunt needed two values here: the Arcade Games category and a tracking description.

### 2. Unity's build callbacks

The package builds through `BuildPipeline.BuildPlayer`, so Unity's standard build callbacks run as part of every Hephaestus build, from the menu and from CI alike. A project adds a step by implementing `IPreprocessBuildWithReport` or `IPostprocessBuildWithReport` in any editor script.

The package's own iOS post-processor runs with `callbackOrder` 999, after the other processors, and only adds Info.plist keys that are not already there. A project processor with a lower order can set its own values first, and they are kept:

```csharp
#if UNITY_IOS
using System.IO;
using UnityEditor;
using UnityEditor.Build;
using UnityEditor.Build.Reporting;
using UnityEditor.iOS.Xcode;

public class GamePostBuildProcessor : IPostprocessBuildWithReport
{
    // Lower than Hephaestus Build's 999, so this runs first.
    public int callbackOrder => 100;

    public void OnPostprocessBuild(BuildReport report)
    {
        if (report.summary.platform != BuildTarget.iOS)
        {
            return;
        }

        var plistPath = Path.Combine(report.summary.outputPath, "Info.plist");
        var plist = new PlistDocument();
        plist.ReadFromFile(plistPath);
        plist.root.SetBoolean("UIRequiresFullScreen", true);
        plist.WriteToFile(plistPath);
    }
}
#endif
```

The same approach works before the build: an `IPreprocessBuildWithReport` can write a build-info file, check that a required config asset is present, or throw a `BuildFailedException` to stop the build with a message.

### 3. Your own entry point

When a project needs to change something before the build starts, for example to produce a staging build with a different scripting define, it can wrap the package instead of copying it. `BuildScript.Build(BuildPlatform, bool? cleanOutput)` is public:

```csharp
using UnityEditor;
using UnityEditor.Build;
using WTFGames.Hephaestus.BuildSystem.Editor;

public static class GameBuild
{
    [MenuItem("Game/Build/Android (Staging)")]
    public static void BuildAndroidStaging()
    {
        PlayerSettings.SetScriptingDefineSymbols(NamedBuildTarget.Android, "STAGING");
        BuildScript.Build(BuildPlatform.Android);
    }
}
```

Everything else stays the same: the output folder, Addressables, signing and the exit code on failure. The CI pipeline picks the method up from `ci.properties`:

```properties
ANDROID_BUILD_METHOD=GameBuild.BuildAndroidStaging
```

Keep in mind that changes made to `PlayerSettings` this way are saved to `ProjectSettings`. On CI that does not matter, because the workspace is thrown away; in the editor, set them back afterwards. The editor assembly of the package is auto-referenced, so this works from any editor script; code in its own assembly definition has to reference `com.wtfgames.hephaestus.build.editor`.

### 4. Overrides from CI

Some values belong to the release, not to the project: the version shown in the stores, the build number and the keystore location on the build machine. Our pipeline sets them with a small temporary editor script that it writes into `Assets` before starting Unity and deletes afterwards. The script applies them on load with `[InitializeOnLoadMethod]`, so they are in place before any build method runs, whether that is Hephaestus Build or a project's own.

This keeps the version number out of the repository's `ProjectSettings`: the build number is the Jenkins build number, and the version comes from `ci.properties` or a parameter of the job.

## What it deliberately does not do

Hephaestus Build stops at the Unity build. For iOS that means an Xcode project, not a signed IPA: archiving, exporting with a provisioning profile and uploading to App Store Connect are done by `xcodebuild` and the CI pipeline, where the signing identities and credentials are. The package also does not manage versions or define symbols for you; earlier versions overwrote the project's define symbols for development and production builds, and that caused more surprises than it solved.

It requires Unity 6 (6000.0) and the build support module of each target platform.

## Trying it

The package is open source under GPL-3.0-or-later and lives on [GitHub](https://github.com/serhii-chechui/HephaestusBuild). Add our scoped registry and the package to `Packages/manifest.json`:

```json
{
  "scopedRegistries": [
    {
      "name": "WTFGames",
      "url": "https://upm.wtfgames.com.ua/",
      "scopes": ["com.wtfgames"]
    }
  ],
  "dependencies": {
    "com.wtfgames.hephaestus.build": "1.0.0"
  }
}
```

If the project already has its own build script, delete it together with any iOS post-processor that does the same work, create the settings asset and copy the project-specific values into it. Leaving the old post-processor in place applies its changes twice.

After that, the next time someone asks how this game is built, the answer is the same as for all the others.
