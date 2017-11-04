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

const renderSelect = props => <Select style={{...props.style}} {...props.input} />

const renderActivities = ({ fields }) => (
  <ActivitiesWrapper>
    <ul>
      {fields.map((activity, i) => (
        <li key={i}>
          <ActivityWrapper>
            <Field name={`${activity}.offsetDay`} component={renderInput} style={{ marginRight: `${getSpacing(`s`)}px` }} placeholder={`Offset départ`} />
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
          <label htmlFor={`url`}>{`Url`}</label>
          <Field name={`url`} component={renderInput} type={`text`} />
        </FieldWrapper>
      </div>
      <div>
        <Field name={`day`} component={renderSelect} style={{ marginRight: `${getSpacing(`s`)}px` }} />
        <Field name={`month`} component={renderSelect} style={{ marginRight: `${getSpacing(`s`)}px` }} />
        <Field name={`year`} component={renderSelect} style={{}}/>
      </div>
      <div>
        <FieldWrapper>
          <Field name={`dep`} component={renderSelect} />
        </FieldWrapper>
        <FieldWrapper style={{ marginRight: 0 }}>
          <Field name={`city`} component={renderInput} type={`text`} placeholder={'Ville'} />
        </FieldWrapper>
      </div>
      <div>
        <Field name={`type`} component={renderSelect} />
      </div>

      <h4>{`Les différentes épreuves`}</h4>
      <div>
        <FieldArray name={`activities`} component={renderActivities} />
      </div>

      <h4>{`Décrivez votre évennement !`}</h4>
      <div>
        <Field name={`infos`} component={Textarea} placeholder={`Infos`} />
      </div>

      <h4>{`Organisateur`}</h4>
      <div>
        <Field name={`organizer.name`} component={renderInput} placeholder={`Nom`} />
        <Field name={`organizer.email`} component={renderInput} placeholder={`Email`} />
        <Field name={`organizer.phone`} component={renderInput} placeholder={`Téléphone`} />
        <Field name={`organizer.url`} component={renderInput} placeholder={`Site Internet`} />
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
