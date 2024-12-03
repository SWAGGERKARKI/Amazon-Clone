export const deliveryOptions = [{
  id: '1',
  deliveryDay: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDay: 5,
  priceCents: 499
}, {
  id: '3',
  deliveryDay: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let option;
  
  deliveryOptions.forEach((deliveryOption) => {
    if (deliveryOptionId === deliveryOption.id) {
      option = deliveryOption;
    }
  });

  return option;
}