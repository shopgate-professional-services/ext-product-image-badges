import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge from './index';

let mockProductListEntry = {};
jest.mock('@shopgate/engage/product', () => ({
  useProductListEntry: () => mockProductListEntry,
}));

jest.mock('../../config.json', () => ({
  showOnPdp: true,
  showOnSliders: true,
  showOnLists: false,
  badgeContainerStylingPdp: {},
  badgeContainerStylingSliders: {},
  badgeContainerStylingLists: {},
  badgeStylingPdp: {},
  badgeStylingSliders: {},
  badgeStylingLists: {},
}), { virtual: true });

const badgeInfo = [
  {
    id: 0,
    src: 'https://example.com/sale.png',
    altText: 'Sale',
  },
  {
    id: 1,
    text: 'New',
  },
];

describe('<Badge />', () => {
  beforeEach(() => {
    mockProductListEntry = {
      productListType: 'pdp',
      productListSubType: 'mediaSection',
    };
  });

  it('should render image and text badges', () => {
    render(<Badge badgeInfo={badgeInfo} badgePosition="topLeft" />);

    expect(screen.getByAltText('Sale')).toHaveAttribute('src', 'https://example.com/sale.png');
    expect(screen.getByText('New')).toHaveClass('product-badge__text');
  });

  it('should render badges with equal content without key warnings', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    render((
      <Badge
        badgeInfo={[
          {
            id: 0,
            src: 'https://example.com/sale.png',
            altText: 'Sale',
          },
          {
            id: 2,
            src: 'https://example.com/sale.png',
            altText: 'Sale',
          },
        ]}
        badgePosition="topLeft"
      />
    ));

    expect(screen.getAllByAltText('Sale')).toHaveLength(2);
    expect(consoleError).not.toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it('should hide images without alt text from assistive technologies', () => {
    render((
      <Badge
        badgeInfo={[{
          id: 0,
          src: 'https://example.com/sale.png',
        }]}
        badgePosition="topLeft"
      />
    ));

    expect(screen.getByRole('img', { hidden: true })).toHaveAttribute('aria-hidden', 'true');
  });

  it('should add the position class to the container', () => {
    const { container } = render(<Badge badgeInfo={badgeInfo} badgePosition="bottomRight" />);

    expect(container.firstChild).toHaveClass('image-badges');
    expect(container.firstChild.className).toMatch(/bottomRightContainer/);
  });

  it('should render on sliders when enabled', () => {
    mockProductListEntry = { productListType: 'productSlider' };
    const { container } = render(<Badge badgeInfo={badgeInfo} badgePosition="topLeft" />);

    expect(container.firstChild).toHaveClass('image-badges');
  });

  it('should render nothing on lists when disabled', () => {
    mockProductListEntry = { productListType: 'productGrid' };
    const { container } = render(<Badge badgeInfo={badgeInfo} badgePosition="topLeft" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render nothing on the pdp outside of the media section', () => {
    mockProductListEntry = {
      productListType: 'pdp',
      productListSubType: 'other',
    };
    const { container } = render(<Badge badgeInfo={badgeInfo} badgePosition="topLeft" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render nothing without badges', () => {
    const { container } = render(<Badge badgeInfo={[]} badgePosition="topLeft" />);

    expect(container).toBeEmptyDOMElement();
  });
});
