const DEFAULT_ITEM = '-- Не выбрано --'
const arrObjects = [{
        arr: [
            'subSelOpt01',
            'subSelOpt02',
            'subSelOpt03',
            'subSelOpt04',
            'subSelOpt05',
        ],
        name: 'Пункт0',
    },
    {
        arr: [
            'subSelOpt11',
            'subSelOpt12',
            'subSelOpt13',
            'subSelOpt14',
            'subSelOpt15',
        ],
        name: 'Пункт1',
    },
    {
        arr: [
            'subSelOpt21',
            'subSelOpt22',
            'subSelOpt23',
            'subSelOpt24',
            'subSelOpt25',
        ],
        name: 'Пункт2',
    },
    {
        arr: [
            'subSelOpt31',
            'subSelOpt32',
            'subSelOpt33',
            'subSelOpt34',
            'subSelOpt35',
        ],
        name: 'Пункт3',
    },
    {
        arr: [
            'subSelOpt41',
            'subSelOpt42',
            'subSelOpt43',
            'subSelOpt44',
            'subSelOpt45',
        ],
        name: 'Пункт4',
    },
]; // объявление массива
let selectedItems = []

const buttonAdd = document.querySelector('.js-add')
const select = document.querySelector('.main-select')
$(document).ready(function () {
   $('.main-select').select2();
});
const itemsName = arrObjects.map(({
    name
}) => name)
const selectsContainer = document.querySelector('.selects-container')

const getOptionsForSelect = (arr) => arr.map(name => `<option>${name}</option>`)
const setItemsToSelect = () => {
    const itemsForSelect = [DEFAULT_ITEM, ...itemsName.filter(itemName => !selectedItems.includes(itemName))]
    select.innerHTML = getOptionsForSelect(itemsForSelect)
}

select.insertAdjacentHTML('beforeend', getOptionsForSelect([DEFAULT_ITEM, ...itemsName]))

buttonAdd.addEventListener('click', () => {
    const selectedItem = select.value
    const isCorrectSelectedItem = selectedItem && itemsName.includes(selectedItem)

    if (isCorrectSelectedItem) {
        const selectedName = itemsName.find(name => name === selectedItem)
        const {
            arr
        } = arrObjects.find(({
            name
        }) => name === selectedName)

        selectsContainer.insertAdjacentHTML('beforeend', `<div data-id="${selectedName}">
      ${selectedName}
      <select class="custom-select" multiple="multiple">${getOptionsForSelect(arr)}</select>
      <button data-id="${selectedName}">Del</button>
    </div>`)
        selectedItems.push(selectedName)
        setItemsToSelect()
        $('.custom-select').select2();
    }
});

document.addEventListener('click', ({
    target
}) => {
    const {
        tagName,
        dataset
    } = target

    if (tagName === 'BUTTON' && (dataset && dataset.id && itemsName.includes(dataset.id))) {
        const containerWithSelect = document.querySelector(`div[data-id="${dataset.id}"]`)
        containerWithSelect.remove()
        selectedItems = selectedItems.filter(item => item !== dataset.id)
        setItemsToSelect()
    }
})
