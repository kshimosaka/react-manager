'use strict';

import _ from 'lodash';
import React from 'react';
import i18n from '../../i18n';

import RowMenu from '../RowMenu.jsx';
import EntityTableColumn from './EntityTableColumn.jsx';

let EntityTableRow = React.createClass({

  propTypes: {
    spec: React.PropTypes.object,
    item: React.PropTypes.object,
    fields: React.PropTypes.array,
    onChange: React.PropTypes.func,
    onChangeField: React.PropTypes.func,
  },

  getInitialState() {
    return {
      spec: this.props.spec,
      item: this.props.item,
    };
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.item !== this.props.item;
  },

  componentWillReceiveProps(props) {
    this.state.spec = props.spec;
    this.state.item = props.item;
  },

  field(id) {
    return this.refs[id];
  },

  render() {
    let fields = this.props.fields;
    let spec = this.state.spec;
    let item = this.state.item;

    let columns = fields.map(field => {

      let value = item[field.id];
      let isPrimary = (spec.schema.primaryKey || ['id']).indexOf(field.id) >= 0;
      let isEditable = !isPrimary;

      return <EntityTableColumn
        ref={field.id}
        key={field.id}
        field={field}
        value={value}
        style={field.style}
        editable={isEditable}
        onChange={this._didChangeField} />;
    });

    let controlItems = [
      { payload: item, text: i18n('Edit'), iconClassName: 'md-edit md-15x' },
      { payload: item, text: i18n('Delete'), iconClassName: 'md-delete md-15x' },
    ];

    return (
      <div className="entity__table__body__row">
        {columns}
        <RowMenu items={controlItems} onItemClick={this._didClickRowMenu} />
      </div>
    );
  },

  _didClickRowMenu(e, i) {
    if (i === 0) {
      // Edit
    } else  if (i === 1) {
      // Remove
    }
  },

  _didChangeField(column, field, value) {
    if (this.props.onChangeField) {
      this.props.onChangeField(this, field, value);
    }
  },

});

export default EntityTableRow;
