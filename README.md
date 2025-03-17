# Shopgate Connect - Extension Product Image Badges

Extension will allow a merchant to display an image badge on a product image based on a tag or property. If you wish to
use a property then you must use
extension [products-properties](https://github.com/shopgate-professional-services/ext-products-properties) in order to have the
property exposed in the same location as tags.

## Features

- Can trigger badges with tags or properties. Must
  use [products-properties](https://github.com/shopgate-professional-services/ext-products-properties) for trigger
  properties.
- Badges will appear in product slider, product grids, and product images on PDP page.
- Configuration for multiple badges per image.
- Badge hierarchy is determined by the order of badges in badgeMap config. With highest priority starting at index 0.
- Unique badge images can trigger for multiple tags or properties.
- Configure on which places the badges should be shown or not (pdp, sliders, lists)

## Configuration

#### badgeMap:

The configuration badgeMap will be used to determine which product tags or properties are used to denote the need for
the associated badge to be added to the product image
Example Value:

```json
{
  "badgeMap": [
    {
      "triggerTags": [
        "tag-1",
        "tag-2"
      ],
      "triggerProps": [
        {
          "label": "triggerProp-1",
          "value": true
        },
        {
          "label": "triggerProp-2",
          "value": false
        }
      ],
      "src": "exampleImage1.com",
      "altText": "a meaningful description of the image for accessibility"
    },
    {
      "triggerTags": [
        "exampleTag-1",
        "exampleTag-2"
      ],
      "triggerProps": [
        {
          "label": "exampleTriggerProp-1",
          "value": "yes"
        },
        {
          "label": "exampleTriggerProp-2",
          "value": "no"
        }
      ],
      "src": "exampleImage2.com",
      "altText": "a meaningful description of the image for accessibility"
    }
  ]
}
```

#### badgeDisplayCount:

This configuration is used to determine how many badges to display per product images. The badge hierarchy is determined
by badgeMap array order.
Default Values:

```json
{
  "badgeDisplayCount": 1
}
```

#### showOnPdp:

If true, it shows the badges on PDP
Default Values:

```json
{
  "showOnPdp": true
}
```

#### showOnSliders:

If true, it shows the badges on product sliders
Default Values:

```json
{
  "showOnSliders": true
}
```

#### showOnLists:

If true, it shows the badges on products lists
Default Values:

```json
{
  "showOnLists": true
}
```

#### badgePositionPdp

This configuration is used to define where the badge is positioned on the product image on the product detail page.
Possible positions are: topLeft, topRight, bottomLeft and bottomRight.
Default Values:

```json
{
  "badgePositionPdp": "topLeft"
}
```

#### badgePositionSliders

This configuration is used to define where the badge is positioned on product sliders. Possible positions are: topLeft,
topRight, bottomLeft and bottomRight.
Default Values:

```json
{
  "badgePositionSliders": "topLeft"
}
```

#### badgePositionLists

This configuration is used to define where the badge is positioned on product lists. Possible positions are: topLeft,
topRight, bottomLeft and bottomRight.
Default Values:

```json
{
  "badgePositionLists": "topLeft"
}
```

#### badgeContainerStylingPdp:

Additional css styling for the badge container on the product detail page (Use glamor style object).
Default Values:

```json
{
  "badgeContainerStylingPdp": {}
}
```

#### badgeContainerStylingSliders:

Additional css styling for the badge container on product sliders (Use glamor style object).
Default Values:

```json
{
  "badgeContainerStylingSliders": {}
}
```

#### badgeContainerStylingLists:

Additional css styling for the badge container on product lists (Use glamor style object).
Default Values:

```json
{
  "badgeContainerStylingPdp": {
    "height": 35
  }
}
```

#### badgeStylingPdp:

Additional css styling for the badges on the product detail page (Use glamor style object).
Default Values:

```json
{
  "badgeStylingPdp": {
    "height": 20
  }
}
```

#### badgeStylingSliders:

Additional css styling for the badges on product sliders (Use glamor style object).
Default Values:

```json
{
  "badgeStylingSliders": {
    "height": 20
  }
}
```

#### badgeStylingLists:

Additional css styling for the badges on product lists (Use glamor style object).
Default Values:

```json
{
  "badgeStylingLists": {}
}
```

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.

## License

Shopgate Connect - Extension Boilerplate is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE) file for more information.
