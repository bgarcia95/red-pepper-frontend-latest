import React from 'react';
import { Typography } from '@material-ui/core';

import Task from './Task';
import { green, orange, red } from '@material-ui/core/colors';

const Column = (props) => {
  const getBgColor = (title) => {
    switch (title) {
      case 'En Cola':
        return red[500];

      case 'En Proceso':
        return orange[500];

      case 'Finalizado':
        return green[500];

      default:
        return 'inherit';
    }
  };

  const inQueueDetails = props.orders
    ?.map((or) => {
      return or.orderDetails?.map((det) => {
        if (det.status === props.column.status) {
          return det;
        } else {
          return null;
        }
      });
    })
    .map((det) => {
      return det?.filter((d) => d !== null && d.status === props.column.status);
    })
    .map((det) => {
      return det?.findIndex((d) => d.status === props.column.status);
    })
    .filter((det) => det > -1);

    const mergedDetails = props.orders.map(order => order?.orderDetails?.map(det => det)).flat().sort((a,b) => a.id - b.id);
    // console.log('mergedDetails Column', mergedDetails);

  return (
    <div
      style={{
        margin: '8px',
        border: '1px solid lightgrey',
        borderRadius: '2px',
        // overflow: 'hidden',
        flexGrow: 1,
        minWidth: '275px',
        maxHeight: '90vh',
        display: 'flex',
        // flex: 1,
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: 8,
          borderBottom: '1px solid lightgrey',
          textAlign: 'center',
          backgroundColor: getBgColor(props.column.title),
        }}
      >
        <Typography variant="h6" style={{ color: '#fff' }}>
          {props.column.title}
        </Typography>
      </div>
      <div
        style={{
          padding: '8px',
          transition: 'background-color 0.2s ease',
          backgroundColor: 'white',
          flexGrow: 1,
          minHeight: '100px',
          overflowY: 'scroll',
        }}
      >
        {props.orders.length === 0 ? (
          <div style={{ textAlign: 'center' }}>
            No existen ordenes actualmente
          </div>
        ) : (
          inQueueDetails.length === 0 && (
            <p style={{ textAlign: 'center' }}>
              No existen detalles actualmente
            </p>
          )
        )}
        {mergedDetails?.map((detail, index) => {
            const orderInfo = props.orders?.find((or) => or.id === detail?.orderId);
            // console.log('orderInfo', orderInfo)

          return (
            <Task
              key={detail?.id || index}
              detail={detail}
              index={index}
              combos={props.combos}
              dishes={props.dishes}
              status={props.column.status}
              orderNumber={orderInfo?.orderNumber}
              orderType={orderInfo?.orderTypeId || orderInfo?.orderType}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Column;
