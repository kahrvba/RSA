const { getSentryExpoConfig } = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname);

// NativeWind configuration
config.resolver.unstable_enablePackageExports = true;

config.resolver.sourceExts.push("cjs");

module.exports = config;