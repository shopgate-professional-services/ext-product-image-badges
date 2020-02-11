# Shopgate Connect - Extension Product Image Badges

Extension will allow a merchant to display a image badge on a product image based on a tag or property. If you wish to use a property then you must use extension [proudcts-add-properties](https://github.com/shopgate/ext-products-add-properties) in order to have the property exposed in the same location as tags.

## Features
- Can trigger badges with tags or properties. Must use [proudcts-add-properties](https://github.com/shopgate/ext-products-add-properties) for trigger properties.
- Badges will appear in product slider, product grids, and product images on PDP page.
- Configuration for multiple badges per image.
- Badge hierarchy is deterimend by the order of badges in badgeMap config. With highest priority starting at index 0.
- Unique badge images can trigger for multiple tags or properties.

## Demo & Examples
[See here](demo/index.md)

## Configuration
There are five required configurations for this extension.

#### badgeMap: 
The configuration badgeMap will be used to determine which product tags or properties are used to denote the need for the associated badge to be added to the product image
Example Value:
```json
{
  "badgeMap": [
    {
      "triggerTags": ["tag-1", "tag-2"],
      "triggerProps": [
        {
          "label":"triggerProp-1",
          "value": true
        },
        {
          "label":"triggerProp-2",
          "value": false
        }
      ],
      "src": "exampleImage1.com"
    },
    {
      "triggerTags": ["exampleTag-1", "exampleTag-2"],
      "triggerProps": [
        {
          "label":"exampleTriggerProp-1",
          "value": "yes"
        },
        {
          "label":"exampleTriggerProp-2",
          "value": "no"
        }
      ],
      "src": "exampleImage2.com"
    }
  ]
}
```

#### badgeDisplayCount:
This configuration is used to determine how many badges to display per product images. The badge hierarchy is determined by badgeMap array order.
Default Values:
```json
  "badgeDisplayCount": 1
```

#### badgeWidth:
This configuration is used to set badge width percentage to be used for all badge location rendering.
Default Values:
```json
  "badgeWidth": "25"
```

#### badgeWidth:
This configuration is used to set a max badge width in percentage or px so that you can control the maximum width for large images.
Default Values:
```json
  "maxBadgeWidth": "200px"
```

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.

## License

Shopgate Connect - Extension Boilerplate is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE) file for more information.
