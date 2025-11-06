import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReservations } from '../features/reservation/reservationListSlice'
import { TbCircleX, TbCircleCheck } from 'react-icons/tb'
import {
  reservationToApprove,
  resetApproveReservation,
} from '../features/reservation/reservationApproveSlice'
import { useState } from 'react'
import { compareAsc, format, parseISO } from 'date-fns'
import {
  deleteReservation,
  resetReservationDelete,
} from '../features/reservation/reservationDeleteSlice'

const Reservations = () => {
  const [todayDate, setTodayDate] = useState(new Date())
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const reservationList = useSelector((state) => state.reservationList)
  const { reservations } = reservationList

  const reservationApprove = useSelector((state) => state.reservationApprove)
  const { success } = reservationApprove

  const reservationDelete = useSelector((state) => state.reservationDelete)
  const { success: successDelete } = reservationDelete

  useEffect(() => {
    if (userInfo || success || successDelete) {
      dispatch(resetReservationDelete())
      dispatch(resetApproveReservation())
      dispatch(getAllReservations())
    }
  }, [dispatch, userInfo, success, successDelete])

  const approveHandler = (id) => {
    dispatch(reservationToApprove(id))
  }

  const deleteHandler = (id) => {
    //delete resevation
    dispatch(deleteReservation(id))
    console.log('Reservation Deleted')
  }

  // (todayDate,toDate)
  const result = (date1, date2) => {
    if (compareAsc(date1, new Date(date2)) === 1) {
      return true
    } else {
      return false
    }
  }
  function formatDate(date) {
    return format(parseISO(date), 'dd-MM-yyyy')
  }
  return (
    <div className="overflow-x-auto mb-20">
      <table className="table table-compact w-full z-0">
        <thead>
          <tr>
            <th></th>
            <th>CarId</th>
            <th>Car</th>
            <th>Cost</th>
            <th>Name</th>
            <th>Phone</th>
            <th>To Date</th>
            <th>Paid</th>
            <th>Approved</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 &&
            reservations.map((reservation, index) => (
              <tr key={reservation._id}>
                <th>{index + 1}</th>
                <td>{reservation.reservationItem.car}</td>
                <td>{reservation.reservationItem.name}</td>
                <td>{reservation.totalCost}</td>
                <td>{reservation.user.name}</td>
                <td>{reservation.user.phoneNumber}</td>
                <td>{formatDate(reservation.toDate)}</td>
                <td>
                  {reservation.isPaid ? (
                    <TbCircleCheck className="text-2xl text-success" />
                  ) : (
                    <TbCircleX className="text-2xl text-error text-center" />
                  )}
                </td>
                <td>
                  {reservation.isApproved ? (
                    <TbCircleCheck className="text-2xl text-success" />
                  ) : (
                    <TbCircleX className="text-2xl text-error text-center" />
                  )}
                </td>
                <td>
                  {!reservation.isApproved && (
                    <button
                      className="btn btn-outline btn-xs btn-warning"
                      onClick={() => approveHandler(reservation._id)}
                    >
                      Approve
                    </button>
                  )}
                  {result(todayDate, reservation.toDate) && (
                    <button
                      className="btn btn-outline btn-xs btn-error"
                      onClick={() => deleteHandler(reservation._id)}
                    >
                      delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>CarId</th>
            <th>Car</th>
            <th>Cost</th>
            <th>Name</th>
            <th>Phone</th>
            <th>To Date</th>
            <th>Paid</th>
            <th>Approved</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default Reservations
