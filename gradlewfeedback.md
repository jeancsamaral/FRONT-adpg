Running 'gradlew :app:bundleRelease' in /home/expo/workingdir/build/android
Welcome to Gradle 8.10.2!
Here are the highlights of this release:
- Support for Java 23
 - Faster configuration cache
 - Better configuration cache reports
For more details see https://docs.gradle.org/8.10.2/release-notes.html
To honour the JVM settings for this build a single-use Daemon process will be forked. For more on this, please refer to https://docs.gradle.org/8.10.2/userguide/gradle_daemon.html#sec:disabling_the_daemon in the Gradle documentation.
Daemon will be stopped at the end of the build
> Task :gradle-plugin:settings-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :gradle-plugin:shared:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :gradle-plugin:settings-plugin:pluginDescriptors
> Task :gradle-plugin:settings-plugin:processResources
> Task :gradle-plugin:shared:processResources NO-SOURCE
> Task :gradle-plugin:shared:compileKotlin
e: The daemon has terminated unexpectedly on startup attempt #1 with error code: 0. The daemon process output:
    1. Kotlin compile daemon is ready
> Task :gradle-plugin:shared:compileJava NO-SOURCE
> Task :gradle-plugin:shared:classes UP-TO-DATE
> Task :gradle-plugin:shared:jar
> Task :gradle-plugin:settings-plugin:compileKotlin
> Task :gradle-plugin:settings-plugin:compileJava NO-SOURCE
> Task :gradle-plugin:settings-plugin:classes
> Task :gradle-plugin:settings-plugin:jar
> Task :gradle-plugin:react-native-gradle-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-updates-gradle-plugin:checkKotlinGradlePluginConfigurationErrors
> Task :expo-dev-launcher-gradle-plugin:checkKotlinGradlePluginConfigurationErrors
> Task :expo-dev-launcher-gradle-plugin:pluginDescriptors
> Task :expo-updates-gradle-plugin:pluginDescriptors
> Task :expo-dev-launcher-gradle-plugin:processResources
> Task :expo-updates-gradle-plugin:processResources
> Task :gradle-plugin:react-native-gradle-plugin:pluginDescriptors
> Task :gradle-plugin:react-native-gradle-plugin:processResources
> Task :gradle-plugin:react-native-gradle-plugin:compileKotlin
> Task :gradle-plugin:react-native-gradle-plugin:compileJava
NO-SOURCE
> Task :gradle-plugin:react-native-gradle-plugin:classes
> Task :gradle-plugin:react-native-gradle-plugin:jar
> Task :expo-dev-launcher-gradle-plugin:compileKotlin
> Task :expo-updates-gradle-plugin:compileKotlin
> Task :expo-dev-launcher-gradle-plugin:compileJava NO-SOURCE
> Task :expo-dev-launcher-gradle-plugin:classes
> Task :expo-updates-gradle-plugin:compileJava NO-SOURCE
> Task :expo-updates-gradle-plugin:classes
> Task :expo-dev-launcher-gradle-plugin:jar
> Task :expo-updates-gradle-plugin:jar
> Configure project :app
 ℹ️  [33mApplying gradle plugin[0m '[32mexpo-dev-launcher-gradle-plugin[0m' (expo-dev-launcher@5.0.35)
 ℹ️  [33mApplying gradle plugin[0m '[32mexpo-updates-gradle-plugin[0m' (expo-updates@0.27.4)
> Configure project :expo-modules-core
Checking the license for package NDK (Side by side) 27.1.12297006 in /home/expo/Android/Sdk/licenses
License for package NDK (Side by side) 27.1.12297006 accepted.
Preparing "Install NDK (Side by side) 27.1.12297006 v.27.1.12297006".
"Install NDK (Side by side) 27.1.12297006 v.27.1.12297006" ready.
Installing NDK (Side by side) 27.1.12297006 in /home/expo/Android/Sdk/ndk/27.1.12297006
"Install NDK (Side by side) 27.1.12297006 v.27.1.12297006" complete.
"Install NDK (Side by side) 27.1.12297006 v.27.1.12297006" finished.
> Configure project :expo
Using expo modules
  - [32mexpo-asset[0m (11.0.5)
  - [32mexpo-constants[0m (17.0.8)
- [32mexpo-dev-client[0m (5.0.20)
  - [32mexpo-dev-launcher[0m (5.0.35)
  - [32mexpo-dev-menu[0m (6.0.25)
  - [32mexpo-eas-client[0m (0.13.3)
  - [32mexpo-file-system[0m (18.0.12)
  - [32mexpo-font[0m (13.0.4)
  - [32mexpo-json-utils[0m (0.14.0)
  - [32mexpo-keep-awake[0m (14.0.3)
  - [32mexpo-linear-gradient[0m (14.0.2)
  - [32mexpo-linking[0m (7.0.5)
  - [32mexpo-manifests[0m (0.15.8)
  - [32mexpo-modules-core[0m (2.2.3)
  - [32mexpo-sharing[0m (13.0.1)
  - [32mexpo-splash-screen[0m (0.29.24)
  - [32mexpo-structured-headers[0m (4.0.0)
  - [32mexpo-system-ui[0m (4.0.9)
  - [32mexpo-updates[0m (0.27.4)
  - [32mexpo-web-browser[0m (14.0.2)
> Configure project :react-native-reanimated
Android gradle plugin: 8.7.2
Gradle: 8.10.2
> Task :expo-asset:preBuild UP-TO-DATE
> Task :expo-asset:preReleaseBuild UP-TO-DATE
> Task :expo-asset:generateReleaseResValues
> Task :expo-asset:generateReleaseResources
> Task :expo-asset:packageReleaseResources
> Task :expo-dev-client:preBuild UP-TO-DATE
> Task :expo-dev-client:preReleaseBuild UP-TO-DATE
> Task :expo-dev-client:generateReleaseResValues
> Task :expo-dev-client:generateReleaseResources
> Task :expo-dev-client:packageReleaseResources
> Task :expo-dev-launcher:preBuild UP-TO-DATE
> Task :expo-dev-launcher:preReleaseBuild UP-TO-DATE
> Task :expo-dev-launcher:generateReleaseResValues
> Task :expo-dev-launcher:generateReleaseResources
> Task :expo-constants:createExpoConfig
> Task :expo-constants:preBuild
> Task :expo-constants:preReleaseBuild
> Task :expo-constants:generateReleaseResValues
> Task :expo-constants:generateReleaseResources
> Task :expo-constants:packageReleaseResources
> Task :expo-dev-menu:preBuild UP-TO-DATE
> Task :expo-dev-menu:preReleaseBuild UP-TO-DATE
> Task :expo-dev-menu:generateReleaseResValues
The NODE_ENV environment variable is required but was not specified. Ensure the project is bundled with Expo CLI or NODE_ENV is set.
Proceeding without mode-specific .env
> Task :expo-dev-menu:generateReleaseResources
> Task :expo:generateExpoModulesPackageListTask
> Task :expo:preBuild
> Task :expo:preReleaseBuild
> Task :expo:generateReleaseResValues
> Task :expo:generateReleaseResources
> Task :expo:packageReleaseResources
> Task :expo-dev-menu-interface:preBuild UP-TO-DATE
> Task :expo-dev-menu-interface:preReleaseBuild UP-TO-DATE
> Task :expo-dev-menu-interface:generateReleaseResValues
> Task :expo-dev-menu-interface:generateReleaseResources
> Task :expo-dev-menu-interface:packageReleaseResources
> Task :expo-eas-client:preBuild UP-TO-DATE
> Task :expo-eas-client:preReleaseBuild UP-TO-DATE
> Task :expo-eas-client:generateReleaseResValues
> Task :expo-dev-launcher:packageReleaseResources
> Task :expo-file-system:preBuild UP-TO-DATE
> Task :expo-file-system:preReleaseBuild UP-TO-DATE
> Task :expo-eas-client:generateReleaseResources
> Task :expo-dev-menu:packageReleaseResources
> Task :expo-font:preBuild UP-TO-DATE
> Task :expo-file-system:generateReleaseResValues
> Task :expo-font:preReleaseBuild UP-TO-DATE
> Task :expo-font:generateReleaseResValues
> Task :expo-file-system:generateReleaseResources
> Task :expo-font:generateReleaseResources
> Task :expo-eas-client:packageReleaseResources
> Task :expo-json-utils:preBuild UP-TO-DATE
> Task :expo-json-utils:preReleaseBuild UP-TO-DATE
> Task :expo-file-system:packageReleaseResources
> Task :expo-keep-awake:preBuild UP-TO-DATE
> Task :expo-keep-awake:preReleaseBuild UP-TO-DATE
> Task :expo-json-utils:generateReleaseResValues
> Task :expo-keep-awake:generateReleaseResValues
> Task :expo-json-utils:generateReleaseResources
> Task :expo-font:packageReleaseResources
> Task :expo-linear-gradient:preBuild UP-TO-DATE
> Task :expo-linear-gradient:preReleaseBuild UP-TO-DATE
> Task :expo-linear-gradient:generateReleaseResValues
> Task :expo-keep-awake:generateReleaseResources
> Task :expo-linear-gradient:generateReleaseResources
> Task :expo-json-utils:packageReleaseResources
> Task :expo-keep-awake:packageReleaseResources
> Task :expo-manifests:preBuild UP-TO-DATE
> Task :expo-manifests:preReleaseBuild UP-TO-DATE
> Task :expo-linking:preBuild UP-TO-DATE
> Task :expo-linking:preReleaseBuild UP-TO-DATE
> Task :expo-manifests:generateReleaseResValues
> Task :expo-linking:generateReleaseResValues
> Task :expo-linear-gradient:packageReleaseResources
> Task :expo-modules-core:preBuild UP-TO-DATE
> Task :expo-manifests:generateReleaseResources
> Task :expo-modules-core:preReleaseBuild UP-TO-DATE
> Task :expo-linking:generateReleaseResources
> Task :expo-modules-core:generateReleaseResValues
> Task :expo-modules-core:generateReleaseResources
> Task :expo-linking:packageReleaseResources
> Task :expo-sharing:preBuild UP-TO-DATE
> Task :expo-sharing:preReleaseBuild UP-TO-DATE
> Task :expo-manifests:packageReleaseResources
> Task :expo-splash-screen:preBuild UP-TO-DATE
> Task :expo-splash-screen:preReleaseBuild UP-TO-DATE
> Task :expo-modules-core:packageReleaseResources
> Task :expo-sharing:generateReleaseResValues
> Task :expo-structured-headers:preBuild UP-TO-DATE
> Task :expo-structured-headers:preReleaseBuild UP-TO-DATE
> Task :expo-splash-screen:generateReleaseResValues
> Task :expo-sharing:generateReleaseResources
> Task :expo-splash-screen:generateReleaseResources
> Task :expo-structured-headers:generateReleaseResValues
> Task :expo-structured-headers:generateReleaseResources
> Task :expo-sharing:packageReleaseResources
> Task :expo-system-ui:preBuild UP-TO-DATE
> Task :expo-system-ui:preReleaseBuild UP-TO-DATE
> Task :expo-system-ui:generateReleaseResValues
> Task :expo-splash-screen:packageReleaseResources
> Task :expo-updates:preBuild UP-TO-DATE
> Task :expo-updates:preReleaseBuild UP-TO-DATE
> Task :expo-system-ui:generateReleaseResources
> Task :expo-structured-headers:packageReleaseResources
> Task :expo-updates-interface:preBuild UP-TO-DATE
> Task :expo-updates-interface:preReleaseBuild UP-TO-DATE
> Task :expo-updates-interface:generateReleaseResValues
> Task :expo-updates:generateReleaseResValues
> Task :expo-system-ui:packageReleaseResources
> Task :expo-updates-interface:generateReleaseResources
> Task :expo-web-browser:preBuild UP-TO-DATE
> Task :expo-web-browser:preReleaseBuild UP-TO-DATE
> Task :expo-web-browser:generateReleaseResValues
> Task :expo-updates:generateReleaseResources
> Task :expo-web-browser:generateReleaseResources
> Task :expo-updates-interface:packageReleaseResources
> Task :react-native-async-storage_async-storage:preBuild UP-TO-DATE
> Task :react-native-async-storage_async-storage:preReleaseBuild UP-TO-DATE
> Task :react-native-async-storage_async-storage:generateReleaseResValues
> Task :expo-updates:packageReleaseResources
> Task :react-native-gesture-handler:preBuild UP-TO-DATE
> Task :react-native-gesture-handler:preReleaseBuild UP-TO-DATE
> Task :expo-web-browser:packageReleaseResources
> Task :react-native-linear-gradient:preBuild UP-TO-DATE
> Task :react-native-linear-gradient:preReleaseBuild UP-TO-DATE
> Task :react-native-async-storage_async-storage:generateReleaseResources
> Task :react-native-gesture-handler:generateReleaseResValues
> Task :react-native-gesture-handler:generateReleaseResources
> Task :react-native-linear-gradient:generateReleaseResValues
> Task :react-native-async-storage_async-storage:packageReleaseResources
> Task :react-native-reanimated:assertLatestReactNativeWithNewArchitectureTask SKIPPED
> Task :react-native-reanimated:assertMinimalReactNativeVersionTask SKIPPED
> Task :react-native-linear-gradient:generateReleaseResources
> Task :react-native-gesture-handler:packageReleaseResources
> Task :react-native-safe-area-context:preBuild UP-TO-DATE
> Task :react-native-safe-area-context:preReleaseBuild UP-TO-DATE
> Task :react-native-safe-area-context:generateReleaseResValues
> Task :react-native-safe-area-context:generateReleaseResources
> Task :react-native-linear-gradient:packageReleaseResources
> Task :react-native-screens:preBuild UP-TO-DATE
> Task :react-native-screens:preReleaseBuild UP-TO-DATE
> Task :react-native-screens:generateReleaseResValues
> Task :react-native-reanimated:prepareReanimatedHeadersForPrefabs
> Task :react-native-safe-area-context:packageReleaseResources
> Task :react-native-svg:preBuild UP-TO-DATE
> Task :react-native-screens:generateReleaseResources
> Task :react-native-svg:preReleaseBuild UP-TO-DATE
> Task :react-native-svg:generateReleaseResValues
> Task :react-native-reanimated:prepareWorkletsHeadersForPrefabs
> Task :react-native-reanimated:preBuild
> Task :react-native-reanimated:preReleaseBuild
> Task :react-native-reanimated:generateReleaseResValues
> Task :react-native-svg:generateReleaseResources
> Task :react-native-reanimated:generateReleaseResources
> Task :react-native-reanimated:packageReleaseResources
> Task :react-native-vector-icons:preBuild UP-TO-DATE
> Task :react-native-vector-icons:preReleaseBuild UP-TO-DATE
> Task :react-native-svg:packageReleaseResources
> Task :react-native-webview:preBuild UP-TO-DATE
> Task :react-native-webview:preReleaseBuild UP-TO-DATE
> Task :react-native-vector-icons:generateReleaseResValues
> Task :react-native-screens:packageReleaseResources
> Task :react-native-webview:generateReleaseResValues
> Task :react-native-vector-icons:generateReleaseResources
> Task :expo:extractDeepLinksRelease
> Task :react-native-webview:generateReleaseResources
> Task :react-native-vector-icons:packageReleaseResources
> Task :react-native-webview:packageReleaseResources
> Task :expo-constants:extractDeepLinksRelease
> Task :expo-asset:extractDeepLinksRelease
> Task :expo-asset:processReleaseManifest
> Task :expo-dev-client:extractDeepLinksRelease
> Task :expo:processReleaseManifest
> Task :expo-constants:processReleaseManifest
> Task :expo-dev-launcher:extractDeepLinksRelease
> Task :expo-dev-menu:extractDeepLinksRelease
> Task :expo-dev-client:processReleaseManifest
> Task :expo-dev-launcher:processReleaseManifest
> Task :expo-dev-menu-interface:extractDeepLinksRelease
> Task :expo-eas-client:extractDeepLinksRelease
> Task :expo-dev-menu:processReleaseManifest
> Task :expo-file-system:extractDeepLinksRelease
> Task :expo-dev-menu-interface:processReleaseManifest
> Task :expo-font:extractDeepLinksRelease
> Task :expo-eas-client:processReleaseManifest
> Task :expo-font:processReleaseManifest
> Task :expo-json-utils:extractDeepLinksRelease
> Task :expo-keep-awake:extractDeepLinksRelease
> Task :expo-file-system:processReleaseManifest
/home/expo/workingdir/build/node_modules/expo-file-system/android/src/main/AndroidManifest.xml:6:9-8:20 Warning:
	provider#expo.modules.filesystem.FileSystemFileProvider@android:authorities was tagged at AndroidManifest.xml:6 to replace other declarations but no other declaration present
> Task :expo-json-utils:processReleaseManifest
> Task :expo-linear-gradient:extractDeepLinksRelease
> Task :expo-linking:extractDeepLinksRelease
> Task :expo-keep-awake:processReleaseManifest
> Task :expo-linear-gradient:processReleaseManifest
> Task :expo-manifests:extractDeepLinksRelease
> Task :expo-linking:processReleaseManifest
> Task :expo-modules-core:extractDeepLinksRelease
> Task :expo-sharing:extractDeepLinksRelease
> Task :expo-manifests:processReleaseManifest
> Task :expo-splash-screen:extractDeepLinksRelease
> Task :expo-modules-core:processReleaseManifest
/home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/AndroidManifest.xml:8:9-11:45 Warning:
	meta-data#com.facebook.soloader.enabled@android:value was tagged at AndroidManifest.xml:8 to replace other declarations but no other declaration present
> Task :expo-splash-screen:processReleaseManifest
> Task :expo-sharing:processReleaseManifest
> Task :expo-updates:extractDeepLinksRelease
> Task :expo-structured-headers:extractDeepLinksRelease
> Task :expo-system-ui:extractDeepLinksRelease
> Task :expo-structured-headers:processReleaseManifest
> Task :expo-updates:processReleaseManifest
> Task :expo-system-ui:processReleaseManifest
> Task :react-native-async-storage_async-storage:extractDeepLinksRelease
> Task :expo-updates-interface:extractDeepLinksRelease
> Task :expo-web-browser:extractDeepLinksRelease
> Task :react-native-async-storage_async-storage:processReleaseManifest
package="com.reactnativecommunity.asyncstorage" found in source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/@react-native-async-storage/async-storage/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.reactnativecommunity.asyncstorage" from the source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/@react-native-async-storage/async-storage/android/src/main/AndroidManifest.xml.
> Task :expo-updates-interface:processReleaseManifest
> Task :expo-web-browser:processReleaseManifest
> Task :react-native-gesture-handler:extractDeepLinksRelease
> Task :react-native-reanimated:extractDeepLinksRelease
> Task :react-native-linear-gradient:extractDeepLinksRelease
> Task :react-native-reanimated:processReleaseManifest
> Task :react-native-gesture-handler:processReleaseManifest
> Task :react-native-linear-gradient:processReleaseManifest
package="com.BV.LinearGradient" found in source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/react-native-linear-gradient/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.BV.LinearGradient" from the source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/react-native-linear-gradient/android/src/main/AndroidManifest.xml.
> Task :react-native-safe-area-context:extractDeepLinksRelease
> Task :react-native-svg:extractDeepLinksRelease
> Task :react-native-screens:extractDeepLinksRelease
> Task :react-native-safe-area-context:processReleaseManifest
package="com.th3rdwave.safeareacontext" found in source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.th3rdwave.safeareacontext" from the source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/AndroidManifest.xml.
> Task :react-native-vector-icons:extractDeepLinksRelease
> Task :react-native-svg:processReleaseManifest
package="com.horcrux.svg" found in source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/react-native-svg/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.horcrux.svg" from the source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/react-native-svg/android/src/main/AndroidManifest.xml.
> Task :react-native-screens:processReleaseManifest
> Task :react-native-webview:extractDeepLinksRelease
> Task :react-native-vector-icons:processReleaseManifest
package="com.oblador.vectoricons" found in source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/react-native-vector-icons/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.oblador.vectoricons" from the source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/react-native-vector-icons/android/src/main/AndroidManifest.xml.
> Task :react-native-webview:processReleaseManifest
> Task :expo-asset:writeReleaseAarMetadata
> Task :expo:writeReleaseAarMetadata
> Task :expo-constants:writeReleaseAarMetadata
> Task :expo-dev-client:writeReleaseAarMetadata
> Task :expo-dev-launcher:writeReleaseAarMetadata
> Task :expo-dev-menu-interface:writeReleaseAarMetadata
> Task :expo-dev-menu:writeReleaseAarMetadata
> Task :expo-file-system:writeReleaseAarMetadata
> Task :expo-font:writeReleaseAarMetadata
> Task :expo-eas-client:writeReleaseAarMetadata
> Task :expo-keep-awake:writeReleaseAarMetadata
> Task :expo-linear-gradient:writeReleaseAarMetadata
> Task :expo-json-utils:writeReleaseAarMetadata
> Task :expo-linking:writeReleaseAarMetadata
> Task :expo-modules-core:writeReleaseAarMetadata
> Task :expo-manifests:writeReleaseAarMetadata
> Task :expo-splash-screen:writeReleaseAarMetadata
> Task :expo-structured-headers:writeReleaseAarMetadata
> Task :expo-sharing:writeReleaseAarMetadata
> Task :expo-updates-interface:writeReleaseAarMetadata
> Task :expo-system-ui:writeReleaseAarMetadata
> Task :expo-updates:writeReleaseAarMetadata
> Task :expo-web-browser:writeReleaseAarMetadata
> Task :react-native-async-storage_async-storage:writeReleaseAarMetadata
> Task :react-native-gesture-handler:writeReleaseAarMetadata
> Task :react-native-linear-gradient:writeReleaseAarMetadata
> Task :react-native-reanimated:writeReleaseAarMetadata
> Task :react-native-safe-area-context:writeReleaseAarMetadata
> Task :react-native-svg:writeReleaseAarMetadata
> Task :react-native-vector-icons:writeReleaseAarMetadata
> Task :react-native-webview:writeReleaseAarMetadata
> Task :react-native-screens:writeReleaseAarMetadata
> Task :expo:compileReleaseLibraryResources
> Task :expo-asset:compileReleaseLibraryResources
> Task :expo-constants:compileReleaseLibraryResources
> Task :app:createBundleReleaseJsAndAssets
Starting Metro Bundler
> Task :expo-asset:parseReleaseLocalResources
> Task :expo-constants:parseReleaseLocalResources
> Task :expo:parseReleaseLocalResources
> Task :expo-asset:generateReleaseRFile
> Task :expo-constants:generateReleaseRFile
> Task :expo:generateReleaseRFile
> Task :expo-dev-client:compileReleaseLibraryResources
> Task :expo-dev-client:parseReleaseLocalResources
> Task :expo-dev-client:generateReleaseRFile
> Task :expo-dev-launcher:compileReleaseLibraryResources
> Task :expo-dev-menu:compileReleaseLibraryResources
> Task :expo-dev-launcher:parseReleaseLocalResources
> Task :expo-dev-menu:parseReleaseLocalResources
> Task :expo-dev-menu-interface:compileReleaseLibraryResources
> Task :expo-dev-launcher:generateReleaseRFile
> Task :expo-eas-client:compileReleaseLibraryResources
> Task :expo-dev-menu-interface:parseReleaseLocalResources
> Task :expo-dev-menu:generateReleaseRFile
> Task :expo-eas-client:parseReleaseLocalResources
> Task :expo-eas-client:generateReleaseRFile
> Task :expo-file-system:compileReleaseLibraryResources
> Task :expo-file-system:parseReleaseLocalResources
> Task :expo-font:compileReleaseLibraryResources
> Task :expo-dev-menu-interface:generateReleaseRFile
> Task :expo-file-system:generateReleaseRFile
> Task :expo-json-utils:compileReleaseLibraryResources
> Task :expo-font:parseReleaseLocalResources
> Task :expo-keep-awake:compileReleaseLibraryResources
> Task :expo-json-utils:parseReleaseLocalResources
> Task :expo-keep-awake:parseReleaseLocalResources
> Task :expo-font:generateReleaseRFile
> Task :expo-json-utils:generateReleaseRFile
> Task :expo-linear-gradient:compileReleaseLibraryResources
> Task :expo-linking:compileReleaseLibraryResources
> Task :expo-linear-gradient:parseReleaseLocalResources
> Task :expo-keep-awake:generateReleaseRFile
> Task :expo-linking:parseReleaseLocalResources
> Task :expo-manifests:compileReleaseLibraryResources
> Task :expo-linear-gradient:generateReleaseRFile
> Task :expo-manifests:parseReleaseLocalResources
> Task :expo-linking:generateReleaseRFile
> Task :expo-modules-core:compileReleaseLibraryResources
> Task :expo-manifests:generateReleaseRFile
> Task :expo-sharing:compileReleaseLibraryResources
> Task :expo-modules-core:parseReleaseLocalResources
> Task :expo-splash-screen:compileReleaseLibraryResources
> Task :expo-splash-screen:parseReleaseLocalResources
> Task :expo-modules-core:generateReleaseRFile
> Task :expo-sharing:parseReleaseLocalResources
> Task :expo-structured-headers:compileReleaseLibraryResources
> Task :expo-splash-screen:generateReleaseRFile
> Task :expo-sharing:generateReleaseRFile
> Task :expo-structured-headers:parseReleaseLocalResources
> Task :expo-system-ui:compileReleaseLibraryResources
> Task :expo-updates:compileReleaseLibraryResources
> Task :expo-system-ui:parseReleaseLocalResources
> Task :expo-updates:parseReleaseLocalResources
> Task :expo-structured-headers:generateReleaseRFile
> Task :expo-updates-interface:compileReleaseLibraryResources
> Task :expo-system-ui:generateReleaseRFile
> Task :expo-updates:generateReleaseRFile
> Task :expo-web-browser:compileReleaseLibraryResources
> Task :expo-updates-interface:parseReleaseLocalResources
> Task :react-native-async-storage_async-storage:compileReleaseLibraryResources
> Task :expo-web-browser:parseReleaseLocalResources
> Task :expo-updates-interface:generateReleaseRFile
> Task :react-native-async-storage_async-storage:parseReleaseLocalResources
> Task :react-native-gesture-handler:compileReleaseLibraryResources
> Task :expo-web-browser:generateReleaseRFile
> Task :react-native-gesture-handler:parseReleaseLocalResources
> Task :react-native-async-storage_async-storage:generateReleaseRFile
> Task :react-native-linear-gradient:compileReleaseLibraryResources
> Task :react-native-reanimated:compileReleaseLibraryResources
> Task :react-native-gesture-handler:generateReleaseRFile
> Task :react-native-reanimated:parseReleaseLocalResources
> Task :react-native-linear-gradient:parseReleaseLocalResources
> Task :react-native-safe-area-context:compileReleaseLibraryResources
> Task :react-native-reanimated:generateReleaseRFile
> Task :react-native-linear-gradient:generateReleaseRFile
> Task :react-native-safe-area-context:parseReleaseLocalResources
> Task :react-native-svg:compileReleaseLibraryResources
> Task :react-native-safe-area-context:generateReleaseRFile
> Task :react-native-svg:parseReleaseLocalResources
> Task :react-native-screens:parseReleaseLocalResources
> Task :react-native-svg:generateReleaseRFile
> Task :react-native-screens:compileReleaseLibraryResources
> Task :react-native-vector-icons:compileReleaseLibraryResources
> Task :react-native-screens:generateReleaseRFile
> Task :react-native-webview:compileReleaseLibraryResources
> Task :expo:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-vector-icons:parseReleaseLocalResources
> Task :react-native-vector-icons:generateReleaseRFile
> Task :expo-asset:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-webview:parseReleaseLocalResources
> Task :expo-asset:generateReleaseBuildConfig
> Task :react-native-webview:generateReleaseRFile
> Task :expo-modules-core:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo:generateReleaseBuildConfig
> Task :expo-constants:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-modules-core:generateReleaseBuildConfig
> Task :expo-constants:generateReleaseBuildConfig
> Task :expo-asset:javaPreCompileRelease
> Task :expo-dev-client:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-constants:javaPreCompileRelease
> Task :expo-dev-launcher:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :app:createBundleReleaseJsAndAssets
Android Bundled 2073ms node_modules/expo-router/entry.js (1367 modules)
Writing bundle output to: /home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle
Writing sourcemap output to: /home/expo/workingdir/build/android/app/build/intermediates/sourcemaps/react/release/index.android.bundle.packager.map
Copying 45 asset files
Done writing bundle output
Done writing sourcemap output
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:2141:20: warning: the variable "Promise" was not declared in function "promiseMethodWrapper"
        return new Promise((resolve, reject) => {
                   ^~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:2363:23: warning: the variable "DebuggerInternal" was not declared in function "__shouldPauseOnThrow"
        return typeof DebuggerInternal !== 'undefined' && DebuggerInternal.sh...
                      ^~~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:3846:5: warning: the variable "setImmediate" was not declared in function "handleResolved"
    setImmediate(function () {
    ^~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:5202:94: warning: the variable "setTimeout" was not declared in anonymous arrow function " 238#"
...).then(callback).catch(error => setTimeout(() => {
                                   ^~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:7503:5: warning: the variable "Headers" was not declared in anonymous function " 311#"
    Headers,
    ^~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:7504:5: warning: the variable "Request" was not declared in anonymous function " 311#"
    Request,
    ^~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:7505:5: warning: the variable "Response" was not declared in anonymous function " 311#"
    Response
    ^~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:7662:24: warning: the variable "FileReader" was not declared in function "readBlobAsArrayBuffer"
      var reader = new FileReader();
                       ^~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:7713:36: warning: the variable "Blob" was not declared in anonymous function " 322#"
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                                   ^~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:7715:40: warning: the variable "FormData" was not declared in anonymous function " 322#"
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                                       ^~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:7717:44: warning: the variable "URLSearchParams" was not declared in anonymous function " 322#"
...e if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body...
                                 ^~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:7836:26: warning: the variable "AbortController" was not declared in anonymous function " 328#"
          var ctrl = new AbortController();
                         ^~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:7970:23: warning: the variable "XMLHttpRequest" was not declared in anonymous function " 332#"
        var xhr = new XMLHttpRequest();
                      ^~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:7515:71: warning: the variable "self" was not declared in anonymous function " 314#"
...undefined' && globalThis || typeof self !== 'undefined' && self ||
                                      ^~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:16894:31: warning: the variable "nativeFabricUIManager" was not declared in anonymous function " 642#"
  var _nativeFabricUIManage = nativeFabricUIManager,
                              ^~~~~~~~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:16922:21: warning: the variable "clearTimeout" was not declared in anonymous function " 642#"
cancelTimeout = clearTimeout;
                    ^~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:16935:51: warning: the variable "RN$enableMicrotasksInReact" was not declared in anonymous function " 642#"
... "undefined" !== typeof RN$enableMicrotasksInReact && !!RN$enableMicrotask...
^~~~~~~~~~~~~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:16936:47: warning: the variable "queueMicrotask" was not declared in anonymous function " 642#"
...otask = "function" === typeof queueMicrotask ? queueMicrotask : scheduleTi...
                                 ^~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:21357:30: warning: the variable "__REACT_DEVTOOLS_GLOBAL_HOOK__" was not declared in anonymous function " 642#"
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
                             ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:21495:26: warning: the variable "navigator" was not declared in anonymous function " 675#"
  "undefined" !== typeof navigator && undefined !== navigator.scheduling && u...
                         ^~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:21605:37: warning: the variable "MessageChannel" was not declared in anonymous function " 675#"
  };else if ("undefined" !== typeof MessageChannel) {
                                    ^~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:21620:34: warning: the variable "nativeRuntimeScheduler" was not declared in anonymous function " 675#"
... = "undefined" !== typeof nativeRuntimeScheduler ? nativeRuntimeScheduler....
                             ^~~~~~~~~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:30480:16: warning: the variable "SharedArrayBuffer" was not declared in function "from"
    if (typeof SharedArrayBuffer !== 'undefined' && (isInstance(value, Shared...
               ^~~~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:53814:26: warning: the variable "SuppressedError" was not declared in anonymous function " 1670#"
    "function" == typeof SuppressedError && SuppressedError;
                         ^~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:54099:34: warning: the variable "structuredClone" was not declared in function "be"
} : "function" == typeof structuredClone ? function (e) {
                                 ^~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:61648:16: warning: Direct call to eval(), but lexical scope is not supported.
        return eval(body);
               ^~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:64904:38: warning: the variable "document" was not declared in anonymous function " 2238#"
...r useClientLayoutEffect = typeof document !== 'undefined' || typeof naviga...
                                    ^~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:70196:9: warning: the variable "REACT_NAVIGATION_DEVTOOLS" was not declared in anonymous arrow function " 2581#"
        REACT_NAVIGATION_DEVTOOLS.set(refContainer.current, {
        ^~~~~~~~~~~~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:79377:11: warning: the variable "cancelAnimationFrame" was not declared in function "cleanup"
          cancelAnimationFrame(this.splashScreenAnimationFrame);
          ^~~~~~~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:80589:16: warning: the variable "ReactNativeWebView" was not declared in function "emitDomEvent"
    if (typeof ReactNativeWebView !== 'undefined') {
               ^~~~~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:112575:76: warning: the variable "Buffer" was not declared in function "convertValue"
... 'function' ? new Blob([value]) : Buffer.from(value);
                                     ^~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:121297:11: warning: the variable "_WORKLET" was not declared in function "assertEasingIsWorklet"
      if (_WORKLET) {
          ^~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:123542:12: warning: the variable "__reanimatedLoggerConfig" was not declared in function "replaceLoggerImplementation"
        ...__reanimatedLoggerConfig,
           ^~~~~~~~~~~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:124143:26: warning:
Direct call to eval(), but lexical scope is not supported.
            workletFun = eval('(' + initData.code + '\n)');
                         ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:124166:112: warning: the variable "_toString" was not declared in function "valueUnpacker"
...recognized by value unpacker: "${_toString(objectToUnpack)}".`);
                                    ^~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:141551:27: warning: the variable "HTMLElement" was not declared in function "findDescendantWithExitingAnimation"
    if (!(node instanceof HTMLElement)) {
                          ^~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:141577:24: warning: the variable "MutationObserver" was not declared in function "addHTMLMutationObserver"
    var observer = new MutationObserver(mutationsList => {
                       ^~~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:141622:41: warning: the variable "getComputedStyle" was not declared in function "fixElementPosition"
...entBorderTopValue = parseInt(getComputedStyle(parent).borderTopWidth);
                                ^~~~~~~~~~~~~~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:145594:5: warning: the variable "jest" was not declared in arrow function "beforeTest"
    jest.useFakeTimers();
    ^~~~
/home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:146170:26: warning: the variable "_getAnimationTimestamp" was not declared in function "computeEasingProgress"
      var elapsedTime = (_getAnimationTimestamp() - startingTimestamp) / 1000;
                         ^~~~~~~~~~~~~~~~~~~~~~
> Task :expo-dev-client:dataBindingMergeDependencyArtifactsRelease
> Task :expo-modules-core:javaPreCompileRelease
> Task :expo-dev-launcher:dataBindingMergeDependencyArtifactsRelease
> Task :expo-dev-client:dataBindingGenBaseClassesRelease
> Task :expo-dev-client:generateReleaseBuildConfig
> Task :expo-dev-client:javaPreCompileRelease
> Task :expo-dev-menu:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-dev-menu:generateReleaseBuildConfig
> Task :expo-dev-menu-interface:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :app:generateAutolinkingPackageList
> Task :app:generateCodegenSchemaFromJavaScript SKIPPED
> Task :app:generateCodegenArtifactsFromSchema SKIPPED
> Task :app:preBuild
> Task :expo-dev-menu-interface:generateReleaseBuildConfig
> Task :app:preReleaseBuild
> Task :expo-dev-menu-interface:javaPreCompileRelease
> Task :expo-json-utils:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-json-utils:generateReleaseBuildConfig
> Task :app:generateReleaseResValues
> Task :expo-dev-launcher:dataBindingGenBaseClassesRelease
> Task :expo-dev-launcher:generateReleaseBuildConfig
> Task :expo-manifests:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-manifests:generateReleaseBuildConfig
> Task :expo-manifests:javaPreCompileRelease
> Task :expo-dev-menu:javaPreCompileRelease
> Task :expo-updates-interface:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-updates-interface:generateReleaseBuildConfig
> Task :expo-json-utils:javaPreCompileRelease
> Task :expo-dev-launcher:javaPreCompileRelease
> Task :expo-eas-client:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-updates-interface:javaPreCompileRelease
> Task :expo-file-system:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-eas-client:generateReleaseBuildConfig
> Task :expo-file-system:generateReleaseBuildConfig
> Task :expo-file-system:javaPreCompileRelease
> Task :expo-font:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-eas-client:javaPreCompileRelease
> Task :expo-keep-awake:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-font:generateReleaseBuildConfig
> Task :expo-keep-awake:generateReleaseBuildConfig
> Task :expo-keep-awake:javaPreCompileRelease
> Task :expo-linear-gradient:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-font:javaPreCompileRelease
> Task :expo-linking:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-linear-gradient:generateReleaseBuildConfig
> Task :expo-linking:generateReleaseBuildConfig
> Task :expo-linear-gradient:javaPreCompileRelease
> Task :expo-sharing:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-linking:javaPreCompileRelease
> Task :expo-splash-screen:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-splash-screen:generateReleaseBuildConfig
> Task :expo-sharing:generateReleaseBuildConfig
> Task :expo-splash-screen:javaPreCompileRelease
> Task :expo-structured-headers:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-sharing:javaPreCompileRelease
> Task :expo-system-ui:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-system-ui:generateReleaseBuildConfig
> Task :expo-structured-headers:generateReleaseBuildConfig
> Task :expo-system-ui:javaPreCompileRelease
> Task :expo-structured-headers:javaPreCompileRelease
> Task :expo-updates:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-web-browser:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-web-browser:generateReleaseBuildConfig
> Task :expo-updates:generateReleaseBuildConfig
> Task :expo-web-browser:javaPreCompileRelease
> Task :expo:javaPreCompileRelease
> Task :react-native-gesture-handler:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-gesture-handler:generateReleaseBuildConfig
> Task :react-native-reanimated:generateReleaseBuildConfig
> Task :react-native-reanimated:javaPreCompileRelease
> Task :react-native-reanimated:packageNdkLibs NO-SOURCE
> Task :expo-updates:javaPreCompileRelease
> Task :react-native-gesture-handler:javaPreCompileRelease
> Task :react-native-safe-area-context:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-safe-area-context:generateReleaseBuildConfig
> Task :app:mapReleaseSourceSetPaths
> Task :app:generateReleaseResources
> Task :react-native-safe-area-context:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaView.kt:59:23 'val uiImplementation: UIImplementation!' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/paper/java/com/th3rdwave/safeareacontext/InsetsChangeEvent.kt:19:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Please add the '@Deprecated' annotation or suppress the diagnostic.
> Task :react-native-safe-area-context:javaPreCompileRelease
> Task :react-native-reanimated:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
> Task :app:mergeReleaseResources
> Task :app:createReleaseCompatibleScreenManifests
> Task :app:extractDeepLinksRelease
> Task :react-native-safe-area-context:compileReleaseJavaWithJavac
Note: /home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/paper/java/com/th3rdwave/safeareacontext/NativeSafeAreaContextSpec.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
> Task :app:processReleaseMainManifest
/home/expo/workingdir/build/android/app/src/main/AndroidManifest.xml Warning:
	provider#expo.modules.filesystem.FileSystemFileProvider@android:authorities was tagged at AndroidManifest.xml:0 to replace other declarations but no other declaration present
> Task :app:processReleaseManifest
> Task :app:processApplicationManifestReleaseForBundle
> Task :react-native-safe-area-context:bundleLibRuntimeToDirRelease
> Task :app:checkReleaseAarMetadata
> Task :react-native-reanimated:bundleLibCompileToJarRelease
> Task :app:packageReleaseResources
> Task :app:parseReleaseLocalResources
> Task :app:processReleaseManifestForPackage
> Task :expo-modules-core:compileReleaseKotlin
> Task :app:processReleaseResources
> Task :react-native-screens:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-screens:generateReleaseBuildConfig
> Task :app:extractReleaseVersionControlInfo
> Task :app:bundleReleaseResources
> Task :react-native-screens:javaPreCompileRelease
> Task :react-native-webview:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-webview:generateReleaseBuildConfig
> Task :react-native-webview:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:22:8 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:82:18 'var allowFileAccessFromFileURLs: Boolean' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:83:18 'var allowUniversalAccessFromFileURLs: Boolean' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:125:21 'fun allowScanningByMediaScanner(): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:162:36 'var systemUiVisibility: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:301:14 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:351:34 Condition is always 'true'.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:370:38 'var allowUniversalAccessFromFileURLs: Boolean' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:431:51 Unchecked cast of 'kotlin.Any?' to 'java.util.HashMap<kotlin.String, kotlin.String>'.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:487:23 'var savePassword: Boolean' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:488:23 'var saveFormData: Boolean' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:558:23 'var allowFileAccessFromFileURLs: Boolean' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:659:65 Unchecked cast of 'java.util.ArrayList<kotlin.Any?>' to 'kotlin.collections.List<kotlin.collections.Map<kotlin.String, kotlin.String>>'.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt:680:23 'var saveFormData: Boolean' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopCustomMenuSelectionEvent.kt:5:8 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopCustomMenuSelectionEvent.kt:11:3 'constructor<T : (Event<Event<*>!>..Event<*>?)>(p0: Int): Event<T>' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopCustomMenuSelectionEvent.kt:22:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Please add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopCustomMenuSelectionEvent.kt:22:42 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopCustomMenuSelectionEvent.kt:23:21 'fun receiveEvent(p0: Int, p1: String!, p2: WritableMap?): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopHttpErrorEvent.kt:5:8 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopHttpErrorEvent.kt:11:3 'constructor<T : (Event<Event<*>!>..Event<*>?)>(p0: Int): Event<T>' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopHttpErrorEvent.kt:22:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Please add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopHttpErrorEvent.kt:22:42 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopHttpErrorEvent.kt:23:21 'fun receiveEvent(p0: Int, p1: String!, p2: WritableMap?): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingErrorEvent.kt:5:8 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingErrorEvent.kt:11:3 'constructor<T : (Event<Event<*>!>..Event<*>?)>(p0: Int): Event<T>' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingErrorEvent.kt:22:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Please add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingErrorEvent.kt:22:42 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingErrorEvent.kt:23:21 'fun receiveEvent(p0: Int, p1: String!, p2: WritableMap?): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingFinishEvent.kt:5:8 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingFinishEvent.kt:11:3 'constructor<T : (Event<Event<*>!>..Event<*>?)>(p0: Int): Event<T>' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingFinishEvent.kt:22:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Please add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingFinishEvent.kt:22:42 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingFinishEvent.kt:23:21 'fun receiveEvent(p0: Int, p1: String!, p2: WritableMap?): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingProgressEvent.kt:5:8 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingProgressEvent.kt:11:3 'constructor<T : (Event<Event<*>!>..Event<*>?)>(p0: Int): Event<T>' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingProgressEvent.kt:22:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Please add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingProgressEvent.kt:22:42 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingProgressEvent.kt:23:21 'fun receiveEvent(p0: Int, p1: String!, p2: WritableMap?): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingStartEvent.kt:5:8 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingStartEvent.kt:11:3 'constructor<T : (Event<Event<*>!>..Event<*>?)>(p0: Int): Event<T>' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingStartEvent.kt:22:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Please add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingStartEvent.kt:22:42 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopLoadingStartEvent.kt:23:21 'fun receiveEvent(p0: Int, p1: String!, p2: WritableMap?): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopMessageEvent.kt:5:8 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopMessageEvent.kt:10:75 'constructor<T : (Event<Event<*>!>..Event<*>?)>(p0: Int): Event<T>' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopMessageEvent.kt:21:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Please add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopMessageEvent.kt:21:42 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopMessageEvent.kt:22:21 'fun receiveEvent(p0: Int, p1: String!, p2: WritableMap?): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopNewWindowEvent.kt:5:8 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopNewWindowEvent.kt:11:3 'constructor<T : (Event<Event<*>!>..Event<*>?)>(p0: Int): Event<T>' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopNewWindowEvent.kt:22:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Please add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopNewWindowEvent.kt:22:42 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopNewWindowEvent.kt:23:21 'fun receiveEvent(p0: Int, p1: String!, p2: WritableMap?): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopRenderProcessGoneEvent.kt:5:8 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopRenderProcessGoneEvent.kt:12:3 'constructor<T : (Event<Event<*>!>..Event<*>?)>(p0: Int): Event<T>' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopRenderProcessGoneEvent.kt:23:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Please add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopRenderProcessGoneEvent.kt:23:42 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopRenderProcessGoneEvent.kt:24:21 'fun receiveEvent(p0: Int, p1: String!, p2: WritableMap?): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopShouldStartLoadWithRequestEvent.kt:5:8 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopShouldStartLoadWithRequestEvent.kt:10:89 'constructor<T : (Event<Event<*>!>..Event<*>?)>(p0: Int): Event<T>' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopShouldStartLoadWithRequestEvent.kt:27:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Please add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopShouldStartLoadWithRequestEvent.kt:27:42 'interface RCTEventEmitter : Any, JavaScriptModule' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/events/TopShouldStartLoadWithRequestEvent.kt:28:21 'fun receiveEvent(p0: Int, p1: String!, p2: WritableMap?): Unit' is deprecated. Deprecated in Java.
> Task :react-native-webview:javaPreCompileRelease
> Task :react-native-webview:compileReleaseJavaWithJavac
> Task :react-native-gesture-handler:compileReleaseKotlin
> Task :react-native-webview:bundleLibRuntimeToDirRelease
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
> Task :react-native-gesture-handler:compileReleaseJavaWithJavac
Note: /home/expo/workingdir/build/node_modules/react-native-gesture-handler/android/paper/src/main/java/com/swmansion/gesturehandler/NativeRNGestureHandlerModuleSpec.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
> Task :react-native-gesture-handler:bundleLibRuntimeToDirRelease
> Task :react-native-async-storage_async-storage:generateReleaseBuildConfig
> Task :react-native-async-storage_async-storage:javaPreCompileRelease
> Task :react-native-async-storage_async-storage:compileReleaseJavaWithJavac
> Task :react-native-async-storage_async-storage:bundleLibRuntimeToDirRelease
/home/expo/workingdir/build/node_modules/@react-native-async-storage/async-storage/android/src/main/java/com/reactnativecommunity/asyncstorage/AsyncStorageModule.java:84: warning: [removal] onCatalystInstanceDestroy() in NativeModule has been deprecated and marked for removal
  public void onCatalystInstanceDestroy() {
              ^
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: /home/expo/workingdir/build/node_modules/@react-native-async-storage/async-storage/android/src/javaPackage/java/com/reactnativecommunity/asyncstorage/AsyncStoragePackage.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
1 warning
> Task :react-native-linear-gradient:generateReleaseBuildConfig
> Task :react-native-linear-gradient:javaPreCompileRelease
> Task :react-native-linear-gradient:compileReleaseJavaWithJavac
> Task :react-native-linear-gradient:bundleLibRuntimeToDirRelease
> Task :react-native-reanimated:bundleLibRuntimeToDirRelease
> Task :react-native-svg:generateReleaseBuildConfig
> Task :react-native-svg:javaPreCompileRelease
> Task :react-native-vector-icons:generateReleaseBuildConfig
> Task :react-native-vector-icons:javaPreCompileRelease
> Task :react-native-svg:compileReleaseJavaWithJavac
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGPatternManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGPatternManagerDelegate.java:19: error: cannot find symbol
public class RNSVGPatternManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGPatternManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                   ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGRectManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGRectManagerDelegate.java:19: error: cannot find symbol
public class RNSVGRectManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGRectManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGTextManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGTextManagerDelegate.java:19: error: cannot find symbol
public class RNSVGTextManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGTextManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGUseManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGUseManagerDelegate.java:19: error: cannot find symbol
public class RNSVGUseManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGUseManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                               ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGImageManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGImageManagerDelegate.java:19: error: cannot find symbol
public class RNSVGImageManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGImageManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                 ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGLineManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGLineManagerDelegate.java:19: error: cannot find symbol
public class RNSVGLineManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGLineManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGMarkerManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGMarkerManagerDelegate.java:19: error: cannot find symbol
public class RNSVGMarkerManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGMarkerManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                  ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGPathManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGPathManagerDelegate.java:19: error: cannot find symbol
public class RNSVGPathManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGPathManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGEllipseManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGEllipseManagerDelegate.java:19: error: cannot find symbol
public class RNSVGEllipseManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGEllipseManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                   ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGGroupManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGGroupManagerDelegate.java:19: error: cannot find symbol
public class RNSVGGroupManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGGroupManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                 ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGCircleManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGCircleManagerDelegate.java:19: error: cannot find symbol
public class RNSVGCircleManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGCircleManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                  ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGDefsManagerDelegate.java:16: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGDefsManagerDelegate.java:18: error: cannot find symbol
public class RNSVGDefsManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGDefsManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGRadialGradientManagerDelegate.java:16: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGRadialGradientManagerDelegate.java:18: error: cannot find symbol
public class RNSVGRadialGradientManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGRadialGradientManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                          ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGLinearGradientManagerDelegate.java:16: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGLinearGradientManagerDelegate.java:18: error: cannot find symbol
public class RNSVGLinearGradientManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGLinearGradientManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                          ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGClipPathManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGClipPathManagerDelegate.java:19: error: cannot find symbol
public class RNSVGClipPathManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGClipPathManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                    ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGSvgViewAndroidManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGSvgViewAndroidManagerDelegate.java:19: error: cannot find symbol
public class RNSVGSvgViewAndroidManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGSvgViewAndroidManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                          ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGSymbolManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGSymbolManagerDelegate.java:19: error: cannot find symbol
public class RNSVGSymbolManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGSymbolManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                  ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGTextPathManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGTextPathManagerDelegate.java:19: error: cannot find symbol
public class RNSVGTextPathManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGTextPathManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                    ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGTSpanManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGTSpanManagerDelegate.java:19: error: cannot find symbol
public class RNSVGTSpanManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGTSpanManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                 ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGMaskManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGMaskManagerDelegate.java:19: error: cannot find symbol
public class RNSVGMaskManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGMaskManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGForeignObjectManagerDelegate.java:17: error: cannot find symbol
import com.facebook.react.uimanager.BaseViewManagerInterface;
                                   ^
  symbol:   class BaseViewManagerInterface
  location: package com.facebook.react.uimanager
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/paper/java/com/facebook/react/viewmanagers/RNSVGForeignObjectManagerDelegate.java:19: error: cannot find symbol
public class RNSVGForeignObjectManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGForeignObjectManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
                                                                         ^
  symbol: class BaseViewManagerInterface
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/main/java/com/horcrux/svg/VirtualView.java:107: error: setPointerEvents(PointerEvents) in VirtualView cannot override setPointerEvents(PointerEvents) in ReactViewGroup
  void setPointerEvents(PointerEvents pointerEvents) {
       ^
  attempting to assign weaker access privileges; was public
> Task :react-native-vector-icons:compileReleaseJavaWithJavac
> Task :react-native-vector-icons:bundleLibRuntimeToDirRelease
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
> Task :react-native-svg:compileReleaseJavaWithJavac FAILED
/home/expo/workingdir/build/node_modules/react-native-svg/android/src/main/java/com/horcrux/svg/RenderableViewManager.java:370: warning: [removal] processTransform(ReadableArray,double[]) in TransformHelper has been deprecated and marked for removal
    TransformHelper.processTransform(transforms, sTransformDecompositionArray);
                   ^
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
43 errors
1 warning
> Task :react-native-screens:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/CustomToolbar.kt:19:33 'class FrameCallback : Choreographer.FrameCallback' is deprecated. Use Choreographer.FrameCallback instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/CustomToolbar.kt:20:18 'class FrameCallback : Choreographer.FrameCallback' is deprecated. Use Choreographer.FrameCallback instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/RNScreensPackage.kt:66:17 'constructor(name: String, className: String, canOverrideExistingModule: Boolean, needsEagerInit: Boolean, hasConstants: Boolean, isCxxModule: Boolean, isTurboModule: Boolean): ReactModuleInfo' is deprecated. This constructor is deprecated and will be removed in the future. Use ReactModuleInfo(String, String, boolean, boolean, boolean, boolean)].
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/Screen.kt:47:77 Unchecked cast of '(androidx.coordinatorlayout.widget.CoordinatorLayout.Behavior<android.view.View!>?..androidx.coordinatorlayout.widget.CoordinatorLayout.Behavior<*>?)' to 'com.google.android.material.bottomsheet.BottomSheetBehavior<com.swmansion.rnscreens.Screen>'.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenContainer.kt:33:33 'class FrameCallback : Choreographer.FrameCallback' is deprecated. Use Choreographer.FrameCallback instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenContainer.kt:34:18 'class FrameCallback : Choreographer.FrameCallback' is deprecated. Use Choreographer.FrameCallback instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:282:31 'var targetElevation: Float' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:285:13 'fun setHasOptionsMenu(p0: Boolean): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:631:18 This declaration overrides a deprecated member but is not marked as deprecated itself. Please add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:638:22 'fun onPrepareOptionsMenu(p0: Menu): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:641:18 This declaration overrides a deprecated member but is not marked as deprecated itself. Please add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:646:22 'fun onCreateOptionsMenu(p0: Menu, p1: MenuInflater): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfig.kt:100:38 'val systemWindowInsetTop: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigViewManager.kt:7:8 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigViewManager.kt:210:9 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigViewManager.kt:212:13 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigViewManager.kt:214:13 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:7:8 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:382:48 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:383:49 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:384:45 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:385:52 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:386:48 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:387:51 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:388:56 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:389:57 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:390:51 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:55:42 'fun replaceSystemWindowInsets(p0: Int, p1: Int, p2: Int, p3: Int): WindowInsetsCompat' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:56:39 'val systemWindowInsetLeft: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:58:39 'val systemWindowInsetRight: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:59:39 'val systemWindowInsetBottom: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:98:53 'var statusBarColor: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:109:48 'var statusBarColor: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:112:32 'var statusBarColor: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:208:72 'var navigationBarColor: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:214:16 'var navigationBarColor: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:5:8 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:142:9 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:144:13 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:146:13 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:148:13 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:150:13 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:152:13 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:154:13 'class MapBuilder : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:7:8 'object ReactFeatureFlags : Any' is deprecated. Use com.facebook.react.internal.featureflags.ReactNativeFeatureFlags instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:25:13 'object ReactFeatureFlags : Any' is deprecated. Use com.facebook.react.internal.featureflags.ReactNativeFeatureFlags instead.
> Task :app:checkReleaseDuplicateClasses
FAILURE: Build failed with an exception.
* What went wrong:
Execution failed for task ':react-native-svg:compileReleaseJavaWithJavac'.
> Compilation failed; see the compiler error output for details.
* Try:
> Run with --info option to get more log output.
> Run with --scan to get full insights.
BUILD FAILED in 3m 26s
420 actionable tasks: 420 executed
Error: Gradle build failed with unknown error. See logs for the "Run gradlew" phase for more information.