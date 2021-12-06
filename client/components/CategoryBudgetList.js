import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategoricalBudget } from '../store/auth';
import './CategoryBudgetList.css';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const CategoryBudgetList = () => {
  const categoricalBudgets = useSelector((state) => state.auth.categoricalBudgets);
  const monthlyBudget = useSelector((state) => state.auth.monthlyBudget);

  const totalCategoricalBudget = categoricalBudgets
    ? categoricalBudgets.reduce((total, catBudget) => {
        if (catBudget.budgetCategories.length != 0) {
          return total + catBudget.budgetCategories[0].budgetForCategory;
        } else {
          return total;
        }
      }, 0)
    : 0;
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
            return <CategoryBudgetListEntry key={category.id} category={category} />;
          })
        ) : (
          <div> Loading... </div>
        )}
        <div className='cbl-monthly-budget-container'>
          <div>Monthly Budget: ${monthlyBudget}</div>
          <div>Categorical Budget Total: ${totalCategoricalBudget}</div>
          <br />
          <div>Unallocated Budget: ${monthlyBudget - totalCategoricalBudget}</div>
        </div>
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
      boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
    },
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal(e) {
    e.stopPropagation();
    setIsOpen(false);
  }

  async function handleClick(newBudget) {
    const responseHelperText = await dispatch(updateCategoricalBudget(props.category.id, newBudget));
    if (typeof responseHelperText == 'string') {
      const helperText = document.getElementsByClassName('cbl-modal-helper-text')[0];
      helperText.classList.remove('hidden');
      return false;
    } else {
      return true;
    }
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
            Close
          </button>
        </div>
        <h3 className='modal-category-name'>{props.category.categoryName}</h3>
        <small className='modal-small-text'>Change the budget for this category</small>
        <div className='modal-input-container'>
          <small className='cbl-modal-helper-text hidden'>
            Your categorical budgets shouldn't exceed your monthly budget
          </small>
          <div className='modal-input-button-container'>
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

            <button
              className='modal-save-button'
              onClick={async (e) => {
                if ((await handleClick(newBudget)) == true) {
                  closeModal(e);
                }
              }}
            >
              Save Change
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryBudgetList;
