export const FormFields = [
  {
    element: 'input',
    label: 'Name: ',
    type: 'text',
    validationRules: [
      {
        rule: '.{2,}',
        errorMessage: 'Please enter a name longer than 2 characters',
      },
      {
        rule: '^[A-Z]',
        errorMessage: 'Name should start with a capital letter',
      },
    ],
  },
  {
    element: 'input',
    label: 'Last known location: ',
    type: 'text',
    validationRules: [
      {
        rule: '.{2,}',
        errorMessage: 'Please enter a location longer than 2 characters',
      },
      {
        rule: '^[A-Z]',
        errorMessage: 'Location should start with a capital letter',
      },
    ],
  },
  {
    element: 'input',
    label: 'Date of birth: ',
    type: 'date',
    validationRules: [
      {
        rule: 'date',
        errorMessage: 'It looks like you are a time traveller. Date of birth can not be in future',
      },
      {
        rule: 'required',
        errorMessage: 'Date of birth is required',
      },
    ],
  },
  {
    element: 'select',
    label: 'Gender: ',
    type: 'select',
    options: ['', 'Male', 'Female', 'Unknown'],
    validationRules: [
      {
        rule: 'required',
        errorMessage: 'Select a gender from the dropdown',
      },
    ],
  },
  {
    element: 'select',
    label: 'Species: ',
    type: 'select',
    options: [
      '',
      'Alien',
      'Animal',
      'Disease',
      'Fish',
      'Human',
      'Humanoid',
      'Human with giant head',
      'Mythological Creature',
      'Poopybutthole',
      'Robot',
      'unknown',
    ],
    validationRules: [
      {
        rule: 'required',
        errorMessage: 'Select a species from the dropdown',
      },
    ],
  },
  {
    element: 'radio',
    type: 'radio',
    name: 'status',
    options: ['Alive', 'Dead', 'Unknown'],
    validationRules: [
      {
        rule: 'required',
        errorMessage: 'Chose a character status',
      },
    ],
  },
  {
    element: 'input',
    label: 'Image: ',
    type: 'file',
    validationRules: [
      {
        rule: 'required',
        errorMessage: 'Image must be downloaded',
      },
    ],
  },
  {
    element: 'input',
    label: 'I consent to this data',
    type: 'checkbox',
    validationRules: [
      {
        rule: 'required',
        errorMessage: 'Confirm information publishing before submitting',
      },
    ],
  },
];
