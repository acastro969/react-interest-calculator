import * as Yup from 'yup';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import Card from './components/Card/Card';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import TotalBalance from './components/TotalBalance/TotalBalance';
import {
  MSG_FIELD_REQUIRED,
  MSG_MAX_RATE,
  MSG_MIN_RATE,
  MSG_TYPE_ERROR
} from './utils/Constants';
import './App.css';

const validationSchema = Yup.object({
  initialDeposit: Yup.number()
    .required(MSG_FIELD_REQUIRED)
    .typeError(MSG_TYPE_ERROR),
  annualContribution: Yup.number()
    .required(MSG_FIELD_REQUIRED)
    .typeError(MSG_TYPE_ERROR),
  years: Yup.number()
    .required(MSG_FIELD_REQUIRED)
    .typeError(MSG_TYPE_ERROR),
  rate: Yup.number()
    .required(MSG_FIELD_REQUIRED)
    .typeError(MSG_TYPE_ERROR)
    .min(0, MSG_MIN_RATE)
    .max(1, MSG_MAX_RATE)
});

function App() {
  const [total, setTotal] = useState();

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const calculateTotal = (initialDeposit, annualContribution, years, rate) => {
    let total = initialDeposit;
    for (let i = 0; i < years; i++) {
      total = Math.round((total + annualContribution) * (rate + 1));
    }

    setTotal(total);
  };

  const handleSubmit = ({ initialDeposit, annualContribution, years, rate }) => {
    calculateTotal(Number(initialDeposit), Number(annualContribution), Number(years), Number(rate));
  };

  return (
    <div className='app'>
      <Formik
        initialValues={{
          initialDeposit: '',
          annualContribution: '',
          years: '',
          rate: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Card>
            <Input name='initialDeposit' label='Depósito Inicial' />
            <Input name='annualContribution' label='Contribución anual' />
            <Input name='years' label='Cantidad de años' />
            <Input name='rate' label='Interés' />
            <Button>Calcular</Button>
            {total && <TotalBalance>{`Total: ${formatter.format(total)}`}</TotalBalance>}
          </Card>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
