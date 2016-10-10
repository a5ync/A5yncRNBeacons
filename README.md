### Setup

- install an rnpm

```bash
npm install rnpm -g
```

- install all npm dependencies
```bash
npm install

rnpm link

react-native run-android
```

- for the devices with Android 4 we have to manually replace the android bundle by executing the code below in the terminal

```bash
react-native start

curl "http://localhost:8081/index.android.bundle?platform=android&dev=true&hot=false&minify=false" -o "android/app/src/main/assets/index.android.bundle"

react-native run-android
```

### Setting the environment for the debugging (Android Studio 2.2)
_Android Studio 2.2 requires Java SDK ver 8_
	
Add the content below to your ~/.bash_profile config file


```bash
#Android SDK
export ANDROID_HOME=/Users/jad/Library/Android/sdk
export PATH=~/Library/Android/sdk/tools:$PATH
export PATH=~/Library/Android/sdk/platform-tools:$PATH
export ANDROID_SDK=/Users/jad/Library/Android/sdk
```

