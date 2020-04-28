import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredient: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
        .map((igKey) => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = { ...this.state.ingredient };
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;
        this.setState({ ingredient: updatedIngredient, totalPrice: updatedPrice });
        this.updatePurchaseState(updatedIngredient);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        let updatedCount = 0;
        let newPrice = this.state.totalPrice;
        const updatedIngredient = { ...this.state.ingredient };
        const priceSubtraction = INGREDIENT_PRICES[type];
        if (oldCount >= 1) {
        updatedCount = oldCount - 1;
        newPrice -= priceSubtraction;
        }
        updatedIngredient[type] = updatedCount;
        this.setState({ ingredient: updatedIngredient, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredient);
    };
    
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler=()=>{
            this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        alert('you continue!!');
    }

    render() {
        const disabledInfo = {
        ...this.state.ingredient,
        };
        for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                <OrderSummary 
                price={this.state.totalPrice}
                ingredients={this.state.ingredient}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>
            </Modal>
            <Burger ingredient={this.state.ingredient} />
            <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            price={this.state.totalPrice}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            />
        </Aux>
        );
    }
}

export default BurgerBuilder;