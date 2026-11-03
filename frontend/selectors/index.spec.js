import { getBadgeInfo } from './index';

jest.mock('@shopgate/engage/product', () => ({
  getProduct: state => state.product,
}));

jest.mock('../config.json', () => ({
  badgeDisplayCount: 2,
  badgeMap: [
    {
      src: 'https://example.com/sale.png',
      altText: 'Sale',
      triggerTags: ['sale'],
      triggerProps: [],
    },
    {
      text: 'New',
      style: { color: 'red' },
      triggerTags: ['new'],
      triggerProps: [],
    },
    {
      src: 'https://example.com/sale.png',
      altText: 'Sale',
      triggerTags: ['clearance'],
      triggerProps: [],
    },
  ],
}), { virtual: true });

describe('Selectors', () => {
  describe('getBadgeInfo', () => {
    it('should return an empty list when there is no product', () => {
      expect(getBadgeInfo({ product: null })).toEqual([]);
    });

    it('should return an empty list while the product is fetching', () => {
      expect(getBadgeInfo({
        product: {
          isFetching: true,
          tags: ['sale'],
        },
      })).toEqual([]);
    });

    it('should return the triggered badges with their position in the badge map as id', () => {
      expect(getBadgeInfo({ product: { tags: ['new'] } })).toEqual([{
        id: 1,
        src: undefined,
        altText: undefined,
        text: 'New',
        style: { color: 'red' },
      }]);
    });

    it('should give badges with equal content distinct ids', () => {
      const result = getBadgeInfo({ product: { tags: ['sale', 'clearance'] } });

      expect(result.map(({ id }) => id)).toEqual([0, 2]);
    });

    it('should limit the badges to the configured display count', () => {
      const result = getBadgeInfo({ product: { tags: ['sale', 'new', 'clearance'] } });

      expect(result.map(({ id }) => id)).toEqual([0, 1]);
    });
  });
});
