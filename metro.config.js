const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Corrige problema do nanoid e libs que exigem resolução de módulos
config.transformer.unstable_allowRequireContext = true;

config.resolver.sourceExts = ["jsx", "js", "ts", "tsx", "json", "cjs"];

module.exports = config;
