import React from 'react';
import {
  defaultHTMLElementModels,
  TBlock
} from '@native-html/transient-render-engine';
import HTMLListElement, {
  HTMLListElementProps
} from '../elements/HTMLListElement';
import { DefaultBlockRenderer } from '../render/render-types';
import { DefaultTagRendererProps } from '../shared-types';
import { SupportedListStyleType } from '../elements/usePrefixRenderer';

function getListStyleTypeFromNestLevel(
  nestLevel: number
): SupportedListStyleType {
  switch (nestLevel % 3) {
    case 0:
      return 'decimal';
    case 1:
      return 'upper-alpha';
    default:
      return 'lower-alpha';
  }
}

function getStyleFromNestLevel(nestLevel: number) {
  return nestLevel > 0 ? { marginTop: 0, marginBottom: 0 } : null;
}

export function useOrderedListRendererProps(
  props: DefaultTagRendererProps<TBlock>
): HTMLListElementProps {
  return {
    ...props,
    listType: 'ol',
    getListStyleTypeFromNestLevel,
    getStyleFromNestLevel
  };
}

const OrderedListRenderer: DefaultBlockRenderer = (props) => {
  return React.createElement(
    HTMLListElement,
    useOrderedListRendererProps(props)
  );
};

OrderedListRenderer.model = defaultHTMLElementModels.ol;

export default OrderedListRenderer;