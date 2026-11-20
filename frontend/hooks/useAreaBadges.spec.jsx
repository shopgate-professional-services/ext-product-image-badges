import React from 'react';
import { ProductContext } from '@shopgate/engage/product';
import { render } from '@testing-library/react';
import useAreaBadges from './useAreaBadges';

let mockProductListEntry = {};
let mockState = {};
let mockWidgetSettings = {};

jest.mock('react-redux', () => ({
  useSelector: selector => selector(mockState),
}));

jest.mock('@shopgate/engage/core', () => ({
  useWidgetSettings: () => mockWidgetSettings,
}));

jest.mock('@shopgate/engage/product', () => ({
  // eslint-disable-next-line global-require
  ProductContext: require('react').createContext({}),
  useProductListEntry: () => mockProductListEntry,
  getProduct: (state, { productId }) => state.products[productId] || null,
  getProductDiscount: (state, { productId }) => state.products[productId]?.price?.discount || 0,
}));

jest.mock('../config.json', () => ({
  badgeDisplayCount: 3,
  showOnPdp: true,
  showOnSliders: true,
  showOnLists: true,
  badgePositionPdp: 'topLeft',
  badgePositionSliders: 'topLeft',
  badgePositionLists: 'topRight',
  badgeMap: [
    {
      src: 'https://example.com/top.png',
      altText: 'Top',
      triggerTags: ['top'],
      triggerProps: [],
      showOn: ['pdp'],
    },
    {
      src: 'https://example.com/new.png',
      altText: 'New',
      triggerTags: ['new'],
      triggerProps: [],
    },
  ],
}), { virtual: true });

/**
 * Renders the hook in a test component and returns its result.
 * @returns {Object}
 */
const renderAreaBadges = (productContext = {}, fallback = undefined) => {
  const result = {};
  /**
   * @returns {null}
   */
  const Probe = () => {
    Object.assign(result, useAreaBadges(fallback));
    return null;
  };
  render((
    <ProductContext.Provider value={productContext}>
      <Probe />
    </ProductContext.Provider>
  ));
  return result;
};

/**
 * @param {Object} product product data
 */
const setProduct = (product) => {
  mockState = { products: { p1: product } };
};

describe('useAreaBadges', () => {
  beforeEach(() => {
    mockWidgetSettings = {};
    setProduct({
      tags: ['top', 'new'],
      price: { discount: 0 },
    });
  });

  it('should return the badges of the area', () => {
    mockProductListEntry = {
      productId: 'p1',
      productListType: 'productSlider',
    };
    const result = renderAreaBadges();

    expect(result.area).toBe('sliders');
    expect(result.position).toBe('topLeft');
    expect(result.badges.map(({ altText }) => altText)).toEqual(['New']);
    expect(result.stackBelowDiscount).toBe(false);
  });

  it('should return no badges outside of the known areas', () => {
    mockProductListEntry = {
      productId: 'p1',
      productListType: 'cart',
    };
    const result = renderAreaBadges();

    expect(result.area).toBeNull();
    expect(result.badges).toEqual([]);
  });

  it('should stack below the discount badge in sliders when the product has a discount', () => {
    setProduct({
      tags: ['new'],
      price: { discount: 20 },
    });
    mockProductListEntry = {
      productId: 'p1',
      productListType: 'productSlider',
    };
    const result = renderAreaBadges();

    expect(result.stackBelowDiscount).toBe(true);
  });

  it('should not stack when the area uses another position', () => {
    setProduct({
      tags: ['new'],
      price: { discount: 20 },
    });
    mockProductListEntry = {
      productId: 'p1',
      productListType: 'productGrid',
    };
    const result = renderAreaBadges();

    expect(result.position).toBe('topRight');
    expect(result.stackBelowDiscount).toBe(false);
  });

  it('should only stack on the pdp when the theme shows the discount badge there', () => {
    setProduct({
      tags: ['new'],
      price: { discount: 20 },
    });
    mockProductListEntry = {
      productId: 'p1',
      productListType: 'pdp',
      productListSubType: 'mediaSection',
    };

    const hidden = renderAreaBadges();
    expect(hidden.stackBelowDiscount).toBe(false);

    mockWidgetSettings = { pdp: { show: true } };
    const shown = renderAreaBadges();
    expect(shown.stackBelowDiscount).toBe(true);
  });

  it('should check the discount of the base product on the pdp like the theme does', () => {
    mockState = {
      products: {
        base: {
          tags: [],
          price: { discount: 0 },
        },
        variant: {
          tags: ['new'],
          price: { discount: 30 },
        },
      },
    };
    mockWidgetSettings = { pdp: { show: true } };
    mockProductListEntry = {
      productId: 'variant',
      productListType: 'pdp',
      productListSubType: 'mediaSection',
    };

    const result = renderAreaBadges({ productId: 'base' });

    expect(result.badges.map(({ altText }) => altText)).toEqual(['New']);
    expect(result.stackBelowDiscount).toBe(false);
  });

  it('should use the fallback area and product outside of a product list entry', () => {
    setProduct({
      tags: ['new'],
      price: { discount: 20 },
    });
    mockWidgetSettings = { pdp: { show: true } };
    mockProductListEntry = {
      productId: null,
      productListType: null,
    };

    const result = renderAreaBadges({ productId: 'p1' }, {
      area: 'pdp',
      productId: 'p1',
    });

    expect(result.area).toBe('pdp');
    expect(result.badges.map(({ altText }) => altText)).toEqual(['New']);
    expect(result.stackBelowDiscount).toBe(true);
  });
});
