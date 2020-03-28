import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  if (!props.ingredients) return null;
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      const number = props.ingredients[igKey];
      const listBurgerIngredient = [];
      for (let el = 1; el <= number; el += 1) {
        listBurgerIngredient.push(<BurgerIngredient key={igKey + el} type={igKey} />);
      }
      return listBurgerIngredient;
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;
