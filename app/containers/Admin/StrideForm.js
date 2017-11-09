import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable'
import { getSpacing } from 'global-styles-variables'

import Input from './Input'
import Select from './Select'
import Button from './Button'
import Textarea from './Textarea'

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

const renderSelect = props => <Select style={{...props.style}} {...props.input} />

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

let StrideForm = props => {
  const { handleSubmit, pristine } = props

  return (
    <Form onSubmit={ handleSubmit }>
      <h4>{`Informations sur l'évennement`}</h4>
      <div>
        <FieldWrapper >
          <label htmlFor={`title`}>{`Title`}</label>
          <Field name={`title`} component={renderInput} type={`text`} />
        </FieldWrapper>
        <FieldWrapper style={{ marginRight: 0 }}>
          <label htmlFor={`keyword`}>{`Keyword`}</label>
          <Field name={`keyword`} component={renderInput} type={`text`} />
        </FieldWrapper>
      </div>

      {/*  DATE */}
      <div>
        <Field name={`day`} component={renderSelect} style={{ marginRight: `${getSpacing(`s`)}px` }} />
        <Field name={`month`} component={renderSelect} style={{ marginRight: `${getSpacing(`s`)}px` }} />
        <Field name={`year`} component={renderSelect} style={{}}/>
      </div>

      {/*  TYPE  */}
      <div>
        <Field name={`type`} component={renderSelect} />
      </div>

      {/*  LOCATION */}
      <h4>{`Adresse de l'événement`}</h4>
      <div>
        <Field name={`address`} component={renderInput} type={`text`} placeholder={'Adresse'} />
      </div>
      <div>
        <Field name={`city`} component={renderInput} type={`text`} placeholder={'Ville'} />
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
        <Field name={`infos`} component={renderTextarea} placeholder={`Présentation des courses, remise des dossards, ...`} />
      </div>

      <h4>{`Inscription`}</h4>
      <div>
        <Field name={`inscription`} component={renderInput} />
      </div>

      <h4>{`Organisateur`}</h4>
      <div>
        <FieldWrapper>
          <Field name={`organizer.name`} component={renderInput} placeholder={`Nom`} style={{ marginBottom: `${getSpacing('s')}px` }} />
          <Field name={`organizer.phone`} component={renderInput} placeholder={`Téléphone`} />
        </FieldWrapper>
        <FieldWrapper style={{ marginRight: 0 }}>
          <Field name={`organizer.email`} component={renderInput} placeholder={`Email`} style={{ marginBottom: `${getSpacing('s')}px` }} />
          <Field name={`organizer.website`} component={renderInput} placeholder={`Site Internet`} />
        </FieldWrapper>
      </div>

      {/*
        Pas de status ni de validation tant que je suis le seul à update la data
      */}
      {/* <h4>{`Status de l'évennement`}</h4>
      <div>
        {`Status ??`}
      </div> */}

      <div>
        {`Dernière mise à jour le XX/XX/XXXX, il y a X jours`}
      </div>

      <div>
        <Button type={`button`} onClick={props.onCancel}>{`Annuler`}</Button>
        <Button type={`submit`} disabled={pristine}>{`Valider`}</Button>
      </div>
    </Form>
  )
}

export default reduxForm({
  form: 'strideForm'
})(StrideForm);
