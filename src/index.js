import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';

new SlimSelect({
  select: '#selectElement',
});

const elements = {
  selectEl: document.querySelector('.breed-select'),
  textMarkEl: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
};
