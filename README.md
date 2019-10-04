# Shopgate Connect - Extension Product Image badges

Extension will allow a merchant to display a image badge on a product image based on tag or property. If you wish to use a property then you must use extension [proudcts-add-properties](https://github.com/shopgate/ext-products-add-properties) in order to have the property exposed in the same location as tags.

## Configuration
There are two required configurations for this extension.

#### badgeMap: 
The configuration badgeMap will be used to determine which product tags or properties are used to denote the need for the associated badge to be added to the product image
Default Values:
```json
{
  "badgeMap": [
    {
      "tags": [
        "preorder"
      ],
      "properties": [],
      "src": "http://data.shopgate.com/shop_widget_images/25579/cc257d580e2d65f88db9ed490fc512ac.min.png"
    },
    {
      "tag": [
        "gs24"
      ],
      "properties": [],
      "src": "http://data.shopgate.com/shop_widget_images/25579/13c29bdf6bc108777a5062fc774d6bdf.min.png"
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

#### gridBadgeRatio:
This configuration is used to set height and width to configure a ratio for badges with product images in a grid view
Default Values:
```json
  "gridBadgeRatio":  {
    "width": 50,
    "height": 70.42
  }
```

#### cardBadgeRatio:
This configuration is used to set height and width to configure a ratio for badges with product images in a card view.
Default Values:
```json
  "cardBadgeRatio": {
    "width": 40,
    "height": 56.33
  }
```

#### pdpBadgeRatio:
This configuration is used to set height and width to configure a ratio for badges with product images on a PDP
Default Values:
```json
  "pdpBadgeRatio": {
    "width": 60,
    "height": 84.5
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
