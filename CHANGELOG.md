# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [2.0.0] - 17-09-2026
### Changed
- Adopted the new engage theme: styling now uses `makeStyles` from `@shopgate/engage/styles` instead of glamor
- `@shopgate/engage` is now a `7.32.0-beta.20` peer dependency (drops PWA 6 support)
- Modernized the frontend toolchain (removed the obsolete `.babelrc` and legacy babel/react dev dependencies)
- Deduplicated the badge rendering in the `Badge` component

## [1.7.0] - 02-07-2025
### Added
- Add support for text-based badges

## [1.6.0] - 12-03-2025
### Added
- Improved accessibility for screen readers

## [1.5.0] - 08-05-2024
### Changed
- Reworked logic to show image badges on PDP, Grid and Sliders

### Added
- Compatibility with PWA 7

## [1.4.0] - 20-05-2021
### Added
- New config for styling

## [1.3.0] - 20-05-2020
### Added
- New configs to hide badges for positions

## [1.2.0] - 02-07-2020
### Changed
- Badge size config to width percentages in order to have compatibility with additional extensions.
- Maximum Badge width config for large images.

## [1.1.0] - 11-25-2019
### Added
- Support for PWA 6.9.0.

## [1.0.0]
### Added
- Initial extension release.


[1.7.0]: https://github.com/shopgate-professional-services/ext-product-image-badges/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/shopgate-professional-services/ext-product-image-badges/compare/v1.5.0...v1.6.0
[1.3.0]: https://github.com/shopgate-professional-services/ext-product-image-badges/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/shopgate-professional-services/ext-product-image-badges/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/shopgate-professional-services/ext-product-image-badges/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/shopgate-professional-services/ext-product-image-badges/releases/v1.0.0
