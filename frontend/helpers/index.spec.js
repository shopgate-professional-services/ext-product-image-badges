import {
  hasTriggerTag,
  hasTriggerProp,
  isTriggered,
  getBadgeArea,
  isShownInArea,
  getAreaBadges,
} from './index';

const triggerProps = [{
  label: 'Warranty',
  value: '3 years',
}];

describe('Helpers', () => {
  describe('hasTriggerTag', () => {
    it('should return true when a product tag matches a trigger tag', () => {
      expect(hasTriggerTag(['sale', 'new'], ['new'])).toBe(true);
    });

    it('should return false when no product tag matches', () => {
      expect(hasTriggerTag(['sale'], ['new'])).toBe(false);
    });

    it('should return false when the product has no tags', () => {
      expect(hasTriggerTag(undefined, ['new'])).toBe(false);
    });
  });

  describe('hasTriggerProp', () => {
    it('should match additional properties by label and value', () => {
      expect(hasTriggerProp([{
        label: 'Warranty',
        value: '3 years',
      }], undefined, triggerProps)).toBe(true);
    });

    it('should not match when only the label is equal', () => {
      expect(hasTriggerProp([{
        label: 'Warranty',
        value: '5 years',
      }], undefined, triggerProps)).toBe(false);
    });

    it('should fall back to properties when there are no additional properties', () => {
      expect(hasTriggerProp(undefined, [{
        label: 'Warranty',
        value: '3 years',
      }], triggerProps)).toBe(true);
    });

    it('should return false when the product has no properties', () => {
      expect(hasTriggerProp(undefined, undefined, triggerProps)).toBe(false);
    });
  });

  describe('isTriggered', () => {
    it('should trigger on a tag', () => {
      expect(isTriggered({ tags: ['new'] }, {
        triggerTags: ['new'],
        triggerProps: [],
      })).toBe(true);
    });

    it('should trigger on a property', () => {
      expect(isTriggered({
        additionalProperties: [{
          label: 'Warranty',
          value: '3 years',
        }],
      }, {
        triggerTags: [],
        triggerProps,
      })).toBe(true);
    });

    it('should not trigger without product data', () => {
      expect(isTriggered(null, {
        triggerTags: ['new'],
        triggerProps,
      })).toBe(false);
    });
  });

  describe('getBadgeArea', () => {
    it('should map the pdp media section', () => {
      expect(getBadgeArea('pdp', 'mediaSection')).toBe('pdp');
    });

    it('should ignore other pdp sections', () => {
      expect(getBadgeArea('pdp', 'other')).toBeNull();
    });

    it('should map sliders and grids', () => {
      expect(getBadgeArea('productSlider')).toBe('sliders');
      expect(getBadgeArea('productGrid', 'search')).toBe('lists');
    });

    it('should return null for unknown list types', () => {
      expect(getBadgeArea('favoritesList')).toBeNull();
    });
  });

  describe('isShownInArea', () => {
    it('should show badges without showOn everywhere', () => {
      expect(isShownInArea({}, 'lists')).toBe(true);
    });

    it('should only show badges in the listed areas', () => {
      expect(isShownInArea({ showOn: ['pdp', 'sliders'] }, 'sliders')).toBe(true);
      expect(isShownInArea({ showOn: ['pdp', 'sliders'] }, 'lists')).toBe(false);
    });

    it('should hide badges with an empty showOn list', () => {
      expect(isShownInArea({ showOn: [] }, 'pdp')).toBe(false);
    });
  });

  describe('getAreaBadges', () => {
    const badgeMap = [
      {
        src: 'https://example.com/top.png',
        altText: 'Top',
        triggerTags: ['top'],
        triggerProps: [],
        showOn: ['pdp', 'sliders'],
      },
      {
        text: 'New',
        style: { color: 'red' },
        triggerTags: ['new'],
        triggerProps: [],
      },
      {
        src: 'https://example.com/top.png',
        altText: 'Top',
        triggerTags: ['clearance'],
        triggerProps: [],
      },
    ];

    it('should return an empty list without product data, area or badge map', () => {
      expect(getAreaBadges(null, 'pdp', badgeMap, 3)).toEqual([]);
      expect(getAreaBadges({ tags: ['new'] }, null, badgeMap, 3)).toEqual([]);
      expect(getAreaBadges({ tags: ['new'] }, 'pdp', undefined, 3)).toEqual([]);
    });

    it('should return an empty list while the product is fetching', () => {
      expect(getAreaBadges({
        isFetching: true,
        tags: ['new'],
      }, 'pdp', badgeMap, 3)).toEqual([]);
    });

    it('should return the triggered badges with their position in the badge map as id', () => {
      expect(getAreaBadges({ tags: ['new'] }, 'pdp', badgeMap, 3)).toEqual([{
        id: 1,
        src: undefined,
        altText: undefined,
        text: 'New',
        style: { color: 'red' },
      }]);
    });

    it('should give badges with equal content distinct ids', () => {
      const result = getAreaBadges({ tags: ['top', 'clearance'] }, 'pdp', badgeMap, 3);

      expect(result.map(({ id }) => id)).toEqual([0, 2]);
    });

    it('should leave out badges that are not shown in the area', () => {
      const result = getAreaBadges({ tags: ['top', 'new'] }, 'lists', badgeMap, 3);

      expect(result.map(({ id }) => id)).toEqual([1]);
    });

    it('should apply the display count after the area filter', () => {
      const result = getAreaBadges({ tags: ['top', 'new', 'clearance'] }, 'lists', badgeMap, 1);

      expect(result.map(({ id }) => id)).toEqual([1]);
    });

    it('should limit the badges to the display count', () => {
      const result = getAreaBadges({ tags: ['top', 'new', 'clearance'] }, 'pdp', badgeMap, 2);

      expect(result.map(({ id }) => id)).toEqual([0, 1]);
    });
  });
});
