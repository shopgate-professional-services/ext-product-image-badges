This file gives AI coding assistants (Claude Code, etc.) and new developers a
fast on-ramp to this repository. Keep it short, factual, and up to date — when
behavior here drifts from the code, update this document in the same PR.

## AI Coding Agent Ground Rules

1. Ask, don't assume. If something is unclear, ask before writing a single line. Never make silent assumptions about intent, architecture, or requirements.

2. Simplest solution first. Always implement the simplest thing that could work. Do not add abstractions or flexibility that weren't explicitly requested.

3. Don't touch unrelated code. If a file or function is not directly part of the current task, do not modify it, even if you think it could be improved.

4. Flag uncertainty explicitly. If you are not confident about an approach or technical detail, say so before proceeding. Confidence without certainty causes more damage than admitting a gap.

## Project Overview

`@shopgate-project/product-image-badges` is a frontend-only Shopgate Connect extension for the
PWA. It shows image or text badges on product images in product grids, product sliders and the
media section of the product detail page. A badge is triggered by product tags or properties
configured in `badgeMap`. There are no backend steps or pipelines.

## Tech Stack

- JavaScript and JSX, React 17, `react-redux`
- `@shopgate/engage` (peer `>=7.32.0`), styling through `makeStyles` from `@shopgate/engage/styles`
- ESLint 8 with `@shopgate/eslint-config`
- Jest 29 through `@shopgate/pwa-unit-test`, with `@testing-library/react`
- npm with a committed `frontend/package-lock.json`

## Common Commands

Run these in `frontend/`:

```sh
npm ci
npm run lint
npm test
npm run test:watch
npm run coverage
```

Running it in an app needs a Shopgate Connect workspace with this extension in `extensions/`
(verify before use):

```sh
sgconnect extension attach ext-product-image-badges
sgconnect frontend start --theme <theme> --host 127.0.0.1 --port 8080
```

## Repository Structure

- `extension-config.json` is the manifest: version, portals and all merchant settings.
- Two portals render the badges:
  - `frontend/portals/ComponentProductImage` wraps `component.product-image` and is the default
    place for badges.
  - `frontend/portals/ProductBadgesAfter` targets `component.product-badges.after`, the container
    of the theme's discount badge. It renders the badges only when they are stacked below that
    badge.
- `frontend/hooks/useAreaBadges.js` is the shared decision point for both portals: current area,
  badges to show, position and `stackBelowDiscount`.
- `frontend/helpers/index.js` holds the pure logic: trigger matching, area mapping and
  `getAreaBadges`.
- `frontend/components/Badge` renders the container and the image or text badges.

### Areas

| Area | Product list type | Settings suffix |
| --- | --- | --- |
| `pdp` | `pdp` with sub type `mediaSection` | `Pdp` |
| `sliders` | `productSlider` | `Sliders` |
| `lists` | `productGrid` (category pages, search, product list widget, relations sheet) | `Lists` |

Any other product list type has no area and renders no badges.

## Internal Knowledge Base

Additional internal documentation may be available in the Knowledge Base:

https://gitlab.localdev.cc/internal/knowledge-base

Future AI coding assistants and developers should check this Knowledge Base when they need context about cross-service dependencies, shared platform conventions, infrastructure, deployment, authentication/authorization, internal libraries, or service contracts.

## Local Development Notes

- `frontend/config.json` is generated from `extension-config.json` by the SDK and is gitignored.
  Components import it; specs mock it with `{ virtual: true }`.
- `README.md` documents every merchant setting with examples.

## Testing Notes

- Specs sit next to the code as `*.spec.js` or `*.spec.jsx`.
- The installed `@testing-library/react` has no `renderHook`. `hooks/useAreaBadges.spec.jsx`
  renders the hook through a small probe component.

## Deployment / CI Notes

- The repository has no CI configuration.
- `CHANGELOG.md` lists released versions only, without pre-release entries.

## Project-Specific Pitfalls

- A badge must render in one portal only. `ComponentProductImage` returns just its children when
  `stackBelowDiscount` is true, and `ProductBadgesAfter` renders nothing when it is false.
- Stacking only applies to the `topLeft` position while the theme shows its discount badge.
- On the pdp the discount check uses the base product from `ProductContext`, as the theme does,
  and also needs the widget setting
  `@shopgate/engage/product/components/ProductDiscountBadge` → `pdp.show`. The badges themselves
  use the product of the list entry, which can be a variant.
- While stacked, the container is placed with `top: 100%` inside the theme's badge container.
  `top`, `marginTop` and `alignItems` from `badgeContainerStyling*` do not apply, and `left`
  counts from that container.
- The key order in the `makeStyles` object of `components/Badge` matters: `stackedContainer` has
  to stay after the custom container keys so it wins over merchant styling.
- The 5px gap below the discount badge uses the `* + &` selector, so it only exists when an
  element is rendered before the badges.
- The container uses `column-reverse`: the first entry of `badgeMap` is displayed at the bottom.
- `badgeDisplayCount` is applied after the `showOn` filter.
- When a product has `additionalProperties`, `hasTriggerProp` does not check `properties`.
- `badgeStyling*` only applies to image badges. Text badges use only their own `style`.

## Editing Guidelines for AI Agents

- Do not commit `frontend/config.json`.
- Do not edit `frontend/package-lock.json` by hand.
- A new merchant setting needs an entry in `extension-config.json` and in `README.md`.
- Keep the existing configuration keys: removing or renaming one changes behavior for shops that
  have it set.
