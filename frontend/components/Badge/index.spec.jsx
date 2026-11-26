import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge from './index';

jest.mock('../../config.json', () => ({
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
  it('should render image and text badges', () => {
    render(<Badge area="pdp" badgeInfo={badgeInfo} badgePosition="topLeft" />);

    expect(screen.getByAltText('Sale')).toHaveAttribute('src', 'https://example.com/sale.png');
    expect(screen.getByText('New')).toHaveClass('product-badge__text');
  });

  it('should render badges with equal content without key warnings', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    render((
      <Badge
        area="pdp"
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
        area="pdp"
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
    const { container } = render(<Badge area="pdp" badgeInfo={badgeInfo} badgePosition="bottomRight" />);

    expect(container.firstChild).toHaveClass('image-badges');
    expect(container.firstChild.className).toMatch(/bottomRightContainer/);
  });

  it('should use the badge styling of the area', () => {
    render(<Badge area="sliders" badgeInfo={badgeInfo} badgePosition="topLeft" />);

    expect(screen.getByAltText('Sale').className).toMatch(/badgeSliders/);
  });

  it('should place stacked badges below the discount badge instead of the corner', () => {
    const { container } = render((
      <Badge area="lists" badgeInfo={badgeInfo} badgePosition="topLeft" stacked />
    ));

    expect(container.firstChild.className).toMatch(/stackedContainer/);
    expect(container.firstChild.className).not.toMatch(/topLeftContainer/);
  });

  it('should render nothing for an unknown area', () => {
    const { container } = render(<Badge area="cart" badgeInfo={badgeInfo} badgePosition="topLeft" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render nothing without badges', () => {
    const { container } = render(<Badge area="pdp" badgeInfo={[]} badgePosition="topLeft" />);

    expect(container).toBeEmptyDOMElement();
  });
});
