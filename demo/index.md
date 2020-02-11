# Demo

## One badge with trigger tags
![](one-badge-tags.png)
```json
{
  "badgeMap": [
    {
      "triggerTags": [
        "preorder"
      ],
      "triggerProps": [],
      "src": "http://data.shopgate.com/shop_widget_images/25579/cc257d580e2d65f88db9ed490fc512ac.min.png"
    },
    {
      "triggerTags": [
        "gs24"
      ],
      "triggerProps": [],
      "src": "http://data.shopgate.com/shop_widget_images/25579/13c29bdf6bc108777a5062fc774d6bdf.min.png"
    }
  ],
  "badgeDisplayCount": 1,
  "badgeWidth": "25"
}
```

## Two badges with trigger tags
![](two-badges-tags.png)
```json
{
  "badgeMap": [
    {
      "triggerTags": [
        "preorder"
      ],
      "triggerProps": [],
      "src": "http://data.shopgate.com/shop_widget_images/25579/cc257d580e2d65f88db9ed490fc512ac.min.png"
    },
    {
      "triggerTags": [
        "gs24"
      ],
      "triggerProps": [],
      "src": "http://data.shopgate.com/shop_widget_images/25579/13c29bdf6bc108777a5062fc774d6bdf.min.png"
    }
  ],
  "badgeDisplayCount": 2,
  "badgeWidth": "25"
}
```

## One badge with trigger properites
![](one-badge-props.png)

**Config**
```json
{
  "badgeMap": [
    {
      "triggerTags": [],
      "triggerProps": [
        {
          "label": "Energieeffizienzklasse",
          "value": "A+"
        }
      ],
      "src": "http://data.shopgate.com/shop_widget_images/25579/cc257d580e2d65f88db9ed490fc512ac.min.png"
    },
    {
      "triggerTags": [],
      "triggerProps": [
        {
          "label": "Energieeffizienzklasse",
          "value": "A+"
        }
      ],
      "src": "http://data.shopgate.com/shop_widget_images/25579/13c29bdf6bc108777a5062fc774d6bdf.min.png"
    }
  ],
  "badgeDisplayCount": 1,
  "badgeWidth": "25"
}
 ```

## Two badges with trigger properites
![](two-badges-props.png)

**Config**
```json
{
  "badgeMap": [
    {
      "triggerTags": [],
      "triggerProps": [
        {
          "label": "Energieeffizienzklasse",
          "value": "A+"
        }
      ],
      "src": "http://data.shopgate.com/shop_widget_images/25579/cc257d580e2d65f88db9ed490fc512ac.min.png"
    },
    {
      "triggerTags": [],
      "triggerProps": [
        {
          "label": "Energieeffizienzklasse",
          "value": "A+"
        }
      ],
      "src": "http://data.shopgate.com/shop_widget_images/25579/13c29bdf6bc108777a5062fc774d6bdf.min.png"
    }
  ],
  "badgeDisplayCount": 2,
  "badgeWidth": "25"
}
 ```

 ## maxWidth Configuration
 ![](no-max-width.png)

 **Config**
```json
{
  "badgeMap": [
    {
      "triggerTags": [
        "preorder"
      ],
      "triggerProps": [],
      "src": "http://data.shopgate.com/shop_widget_images/25579/cc257d580e2d65f88db9ed490fc512ac.min.png"
    },
    {
      "triggerTags": [
        "gs24"
      ],
      "triggerProps": [],
      "src": "http://data.shopgate.com/shop_widget_images/25579/13c29bdf6bc108777a5062fc774d6bdf.min.png"
    }
  ],
  "badgeDisplayCount": 1,
  "badgeWidth": "25",
  "maxBadgeWidth": null
}
 ```

  ![](max-width.png)

 **Config**
```json
{
  "badgeMap": [
    {
      "triggerTags": [
        "preorder"
      ],
      "triggerProps": [],
      "src": "http://data.shopgate.com/shop_widget_images/25579/cc257d580e2d65f88db9ed490fc512ac.min.png"
    },
    {
      "triggerTags": [
        "gs24"
      ],
      "triggerProps": [],
      "src": "http://data.shopgate.com/shop_widget_images/25579/13c29bdf6bc108777a5062fc774d6bdf.min.png"
    }
  ],
  "badgeDisplayCount": 1,
  "badgeWidth": "25",
  "maxBadgeWidth": "200"
}
 ```