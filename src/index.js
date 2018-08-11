export const ELEMENT_TYPES = {
  TEXT_ELEMENT: 'TEXT_ELEMENT'
};

export function render(element, parentDom) {
  const {
    type,
    props: { children, ...otherProps }
  } = element;

  // Create DOM element
  const dom =
    type === ELEMENT_TYPES.TEXT_ELEMENT
      ? document.createTextNode('')
      : document.createElement(type);
  const { events, attributes } = splitEventsAndAttributes(otherProps);

  // Add events
  Object.keys(events).forEach(eventName =>
    dom.addEventListener(eventName, events[eventName])
  );

  // Add attributes
  Object.keys(attributes).forEach(
    attributeName => (dom[attributeName] = attributes[attributeName])
  );

  // Render children
  const childElements = children || [];
  childElements.forEach(childElement => render(childElement, dom));
  parentDom.appendChild(dom);
}

const splitEventsAndAttributes = (props = {}) => {
  return Object.keys(props).reduce(
    (memo, prop) => {
      if (prop.indexOf('on') === 0) {
        memo.events[prop] = props[prop];
      } else {
        memo.attributes[prop] = props[prop];
      }
      return memo;
    },
    {
      events: {},
      attributes: {}
    }
  );
};
