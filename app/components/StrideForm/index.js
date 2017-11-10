/**
*
* StrideForm
*
*/

import React from 'react';
import styled from 'styled-components';
import moment from 'moment'
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable'
import { getSpacing } from 'global-styles-variables'

import Input from './Input'
import Select from './Select'
import Button from './Button'
import Textarea from './Textarea'

// STYLED COMPONENTS
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  > div {
    padding: ${getSpacing(`s`)}px 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`

const FieldWrapper = styled.div`
  width: 100%;
  margin-right: ${getSpacing(`s`)}px;
`

const ActivitiesWrapper = styled.div`
  width: 100%;
  > ul {
    margin: 0;
    padding-left: 0;
    list-style-type: none;
  }
`

const ActivityWrapper = styled.div`
  display: flex;
  margin-bottom: ${getSpacing(`s`)}px;
`

const renderInput = props => <Input style={{...props.style}} {...props.input} placeholder={props.placeholder} />

const renderTextarea = props => <Textarea style={{...props.style}} {...props.input} placeholder={props.placeholder} />

const renderSelect = ({ dateElement, style, input }) => <Select dateElement={dateElement} {...input} style={{...style}} />

const renderActivities = ({ fields }) => (
  <ActivitiesWrapper>
    <ul>
      {fields.map((activity, i) => (
        <li key={i}>
          <ActivityWrapper>
            <Field name={`${activity}.offsetDay`} component={renderInput} style={{ marginRight: `${getSpacing(`s`)}px` }} placeholder={`Offset jour de départ`} />
            <Field name={`${activity}.time`} component={renderInput} style={{ marginRight: `${getSpacing(`s`)}px` }} placeholder={`Heure de départ`} />
            <Field name={`${activity}.distance`} component={renderInput} placeholder={`Distance`} />
          </ActivityWrapper>
        </li>
      ))}
    </ul>
    <Button type={`button`} onClick={() => fields.push({})}>
      {`Add an Activity`}
    </Button>
  </ActivitiesWrapper>
)

const FieldTrim = props => <Field {...props} normalize={value => value.trim()} />

const formatDate = format => value => moment.unix(value).format(format)

const normalizeDate = dateElement => (value, previousValue) => {
  let fct
  if (dateElement === 'day') fct = 'date'
  else if (dateElement === 'month') fct = 'month'
  else if (dateElement === 'year') fct = 'year'
  return moment.unix(previousValue)[fct](value).unix()
}

function StrideForm (props) {

  const { handleSubmit, pristine } = props

  const lastUpdateDate = props.initialValues.getIn(['lastUpdate', 'date'])

  const dateElements = [
    { name: 'day', format: 'D' },
    { name: 'month', format: 'MMMM' },
    { name: 'year', format: 'YYYY' }
  ]

  return (
    <Form onSubmit={ handleSubmit }>
      <h4>{`Informations sur l'évennement`}</h4>
      <div>
        <FieldWrapper >
          <label htmlFor={`title`}>{`Title`}</label>
          <FieldTrim name={`title`} component={renderInput} />
        </FieldWrapper>
        <FieldWrapper style={{ marginRight: 0 }}>
          <label htmlFor={`keyword`}>{`Keyword`}</label>
          <FieldTrim name={`keyword`} component={renderInput} />
        </FieldWrapper>
      </div>

      {/*  DATE */}
      <div>
        {dateElements.map(({ name, format }, i) =>
          <Field key={i} name={`date`} dateElement={name} format={formatDate(format)}
            normalize={normalizeDate(name)}
            component={renderSelect}
            style={{ marginRight: `${i === 2 ? 0 : getSpacing(`s`)}px` }}
          />
        )}
      </div>

      {/*  TYPE  */}
      <div>
        <Field name={`type`} component={renderSelect} />
      </div>

      {/*  LOCATION */}
      <h4>{`Adresse de l'événement`}</h4>
      <div>
        <FieldTrim name={`address`} component={renderInput} placeholder={'Adresse'} />
      </div>
      <div>
        <FieldTrim name={`city`} component={renderInput} placeholder={'Ville'} />
      </div>
      <div>
        <Field name={`dep`} component={renderSelect} />
      </div>

      {/*  ACTIVITIES */}
      <h4>{`Les différentes épreuves`}</h4>
      <div>
        <FieldArray name={`activities`} component={renderActivities} />
      </div>

      <h4>{`Décrivez votre évennement !`}</h4>
      <div>
        <FieldTrim name={`infos`} component={renderTextarea} placeholder={`Présentation des courses, remise des dossards, ...`} />
      </div>

      <h4>{`Inscription`}</h4>
      <div>
        <FieldTrim name={`inscription`} component={renderInput} />
      </div>

      <h4>{`Organisateur`}</h4>
      <div>
        <FieldWrapper>
          <FieldTrim name={`organizer.name`} component={renderInput} placeholder={`Nom`} style={{ marginBottom: `${getSpacing('s')}px` }} />
          <FieldTrim name={`organizer.phone`} component={renderInput} placeholder={`Téléphone`} />
        </FieldWrapper>
        <FieldWrapper style={{ marginRight: 0 }}>
          <FieldTrim name={`organizer.email`} component={renderInput} placeholder={`Email`} style={{ marginBottom: `${getSpacing('s')}px` }} />
          <FieldTrim name={`organizer.website`} component={renderInput} placeholder={`Site Internet`} />
        </FieldWrapper>
      </div>

      {/*
        Pas de status ni de validation tant que je suis le seul à update la data
      */}
      {/* <h4>{`Status de l'évennement`}</h4>
      <div>
        {`Status ??`}
      </div> */}

      {props.initialValues.get('lastUpdate').get('user') &&
        <div>
          <span>{`Dernière mise à jour le ${moment.unix(lastUpdateDate).format('DD MMMM YYYY')}`}</span>
        </div>
      }

      <div>
        <Button type={`button`} onClick={props.onCancel}>{`Annuler`}</Button>
        <Button type={`submit`} disabled={pristine}>{`Valider`}</Button>
      </div>
    </Form>
  );
}

StrideForm.propTypes = {

};

export default reduxForm({
  form: 'strideForm'
})(StrideForm);
