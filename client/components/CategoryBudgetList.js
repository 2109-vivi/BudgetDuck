import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './CategoryBudgetList.css';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const CategoryBudgetList = () => {
  const categoricalBudgets = useSelector(
    (state) => state.auth.categoricalBudgets
  );

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
            return (
              <CategoryBudgetListEntry
                key={category.id}
                category={category}
                handleClick={handleClick}
              />
            );
          })
        ) : (
          <div> Loading... </div>
        )}
      </div>
    </div>
  );
};

const CategoryBudgetListEntry = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal(e) {
    e.stopPropagation();
    setIsOpen(false);
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
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel='Example Modal'
        style={modalStyles}
      >
        <button onClick={closeModal}>X</button>
        <div className='modal-category-name'>{props.category.categoryName}</div>
        <div className='edit-category-budget-field'>
          <input
            name='newBudget'
            type='text'
            placeholder={
              props.category.budgetCategories.length != 0
                ? `$${props.category.budgetCategories[0].budgetForCategory}`
                : '$0'
            }
          ></input>
          <button>Change budget!</button>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryBudgetList;
