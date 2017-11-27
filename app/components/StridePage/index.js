/**
*
* StridePage
*
*/

import React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { getSpacing } from 'global-styles-variables';
import { getColorRGBA, white } from 'colors';

import Runner from 'images/ic_directions_run_white_24px.svg';
import Agenda from 'images/ic_event_white_24px.svg';
import Location from 'images/ic_location_on_white_24px.svg';
import Schedule from 'images/ic_schedule_white_24px.svg';
import Flag from 'images/ic_flag_white_24px.svg';
import { DEPARTEMENTS, DATE_FORMAT } from 'utils/enums';

import messages from './messages';
import StridePageEmptyState from './StridePageEmptyState';

const StridePageWrapper = styled.div`
  height: 100%;
  padding: 0;
  overflow: auto;
`

const HEADER = css`
  padding: 0 ${getSpacing('m')}px;
  text-transform: capitalize;
`
const H1 = styled.h1`${HEADER}`
const H2 = styled.h2`${HEADER}`

const InformationList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: ${getSpacing('m')}px;
`

const InfomationItem = styled.li`
  background-color: ${getColorRGBA('dominant', 0.5)};
  padding: ${getSpacing('s')}px;
  padding-left: ${getSpacing('m')}px;
  margin-bottom: ${getSpacing('xxs')}px;
  color: ${white};
`

const InformationContent = styled.span`
  padding-left: ${getSpacing('xxs')}px;
  margin-right: ${getSpacing('m')}px;
`

const OrganizerWrapper = styled.div`
  padding: ${getSpacing('s')}px;
  padding-left: ${getSpacing('m')}px;
`

function getStrideDataFormated(stride) {
  let type = stride.type[0].toUpperCase() + stride.type.slice(1);
  let date = moment.unix(stride.date).format(DATE_FORMAT);
  let dep = DEPARTEMENTS.find(depObj => depObj.id === stride.dep);
  return [
    { description: type, Icon: Runner },
    { description: date, Icon: Agenda },
    { description: `${stride.city || ``} - ${dep.value}`, Icon: Location }
  ]
}

function getFormatedDistance (distance, value) {
  if (value < 1000)
    return distance

  return `${value/1000}km`
}

function StridePage(props) {
  if (!props.stride.title)
    return <StridePageEmptyState />

  let data = getStrideDataFormated(props.stride)

  return (
    <StridePageWrapper>
      <H1 className={`circular-bold`}>{props.stride.title}</H1>
      <H2><FormattedMessage {...messages.informations} /></H2>
      <InformationList>
        {data.map(({ description, Icon}, i) =>
          <InfomationItem key={i}>
            <Icon /><InformationContent>{description}</InformationContent>
          </InfomationItem>
        )}
      </InformationList>

      <InformationList>
        {props.stride.activities
          .sort((activityA, activityB) => activityB.value - activityA.value)
          .map(({ distance, infos, time, title, value }, i) =>
            <InfomationItem key={i}>
              <Schedule /><InformationContent>{time}</InformationContent>
              <Flag /><InformationContent>{getFormatedDistance(distance, value)}</InformationContent>
            </InfomationItem>
          )}
      </InformationList>

      <OrganizerWrapper>
        {props.stride.inscriptions &&
          <div>
            <h3>{`Inscriptions`}</h3>
            <a href={props.stride.inscriptions}>{props.stride.inscriptions}</a>
          </div>
        }

        <h3>{`Organisateur`}</h3>
        <div style={{ textTransform: `capitalize` }}>{props.stride.organizer.name}</div>
        <div><a href={props.stride.organizer.website}>{props.stride.organizer.website}</a></div>
        <div>{props.stride.organizer.infos}</div>
        <div><a href={`mailto:${props.stride.organizer.email}`}>{props.stride.organizer.email}</a></div>
      </OrganizerWrapper>

    </StridePageWrapper>
  );
}

StridePage.propTypes = {

};

export default StridePage;
