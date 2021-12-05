import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategoricalBudget } from '../store/auth';
import './CategoryBudgetList.css';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const CategoryBudgetList = () => {
  const categoricalBudgets = useSelector((state) => state.auth.categoricalBudgets);

  const handleClick = (evt) => {
    console.log('clicked');
  };

  return (
    <div className='category-budget-list-wrapper'>
      <div className='cbl-header'>
        <h2>Your budgets by category</h2>
        <div className='cbl-small-options'>
          <small>(click on a category to edit)</small>
        </div>
      </div>
      <div className='category-list-container'>
        {categoricalBudgets != null ? (
          categoricalBudgets.map((category) => {
            return <CategoryBudgetListEntry key={category.id} category={category} handleClick={handleClick} />;
          })
        ) : (
          <div> Loading... </div>
        )}
      </div>
    </div>
  );
};

const CategoryBudgetListEntry = (props) => {
  const dispatch = useDispatch();
  const [newBudget, setNewBudget] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '16px',
    },
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal(e) {
    e.stopPropagation();
    setIsOpen(false);
  }

  function handleClick(newBudget) {
    dispatch(updateCategoricalBudget(props.category.id, newBudget));
  }
  function handleChange(evt) {
    setNewBudget(evt.target.value);
  }

  return (
    <div className='cbl-entry-wrapper' onClick={openModal}>
      <div className='cbl-entry-text'>{props.category.categoryName}</div>
      <div className='cbl-entry-text'>
        Budget:{' '}
        {props.category.budgetCategories.length != 0
          ? `$${props.category.budgetCategories[0].budgetForCategory}`
          : '$0'}
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel='Example Modal' style={modalStyles}>
        <div className='modal-close-button-container'>
          <button className='modal-close-button' onClick={closeModal}>
            X
          </button>
        </div>
        <h3 className='modal-category-name'>{props.category.categoryName}</h3>
        <small className='modal-small-text'>Change the budget for this category</small>
        <div className='modal-input-container'>
          <input
            name='newBudget'
            type='text'
            value={newBudget}
            onChange={handleChange}
            placeholder={
              props.category.budgetCategories.length != 0
                ? `$${props.category.budgetCategories[0].budgetForCategory}`
                : '$0'
            }
          ></input>
          <div> </div>
          <button
            className='modal-save-button'
            onClick={(e) => {
              handleClick(newBudget);
            }}
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryBudgetList;
