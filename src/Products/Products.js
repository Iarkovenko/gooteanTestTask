import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Products.scss';
import fakeProductsData from './fakeProductsData.json';

const formatName = name => name.replace('&amp;', '&');
const toSlug = name => `#${name.toLowerCase().replace(' ', '-')}`;

function itemView({product_id, url, name, cheapest_price}) {
  return (
    <div key={product_id+Math.random()} class='col-lg-3 col-sm-4 col-xs-6'>
      <a href='#'>
        <div class='product__card product__card--style product__card__all'>
          <div class='product__image'>
            <img class='lazy-loaded' src={url} alt='Accessory Pouches' />
          </div>
          <div class='product__caption'>
            <label>{name}</label> <p>Starting at {cheapest_price}</p>
          </div>
          {/* <a className="detail-link" target="_blank" href="https://www.google.com">PRODUCT DETAIL</a>
          <a className="detail-pick" target="_blank" href="https://www.google.com">PICK THIS</a> */}
        </div>
      </a>
    </div>
  );
}

const filterProductsByCategory = category =>
  fakeProductsData['product-catalog']
    .find(c => c.name === category)
    .items.reduce((res, i) => {
      if (i.type === 'product') {
        res.push(itemView(i));
      } else if (i.type === 'category') {
        i.items.filter(i => i.type === 'product').forEach(i => res.push(itemView(i)));
      }
      return res;
    }, []);

export const Products = () => {
  const [selectedCategory, selectCategory] = useState('All');

  return (
    <div className='container'>
      <nav className='nav nav-pills flex-column flex-sm-row'>
        {fakeProductsData['product-catalog']
          .filter(i => i.type === 'category')
          .reverse()
          .map(c => (
            <a
              key={c.name}
              className={'flex-sm-fill text-sm-center nav-link' + (c.name === selectedCategory ? ' active' : '')}
              onClick={() => selectCategory(c.name)}
              href={toSlug(c.name)}
            >
              {formatName(c.name)}
            </a>
          ))}
      </nav>
      <hr />
      <div class='row'>{filterProductsByCategory(selectedCategory)}</div>
    </div>
  );
};

export default Products;
