import { HttpStatus } from '@nestjs/common'
import { ErrorResponse } from '@common/exceptions/app.exception'
export const Errors: Record<string, ErrorResponse> = {
  VALIDATION_FAILED: {
    error: 'VALIDATION_FAILED',
    message: 'Dữ liệu không hợp lệ',
    httpStatus: HttpStatus.BAD_REQUEST
  },
  OBJECT_NOT_FOUND: {
    error: 'OBJECT_NOT_FOUND',
    message: 'Không tìm thấy đối tượng',
    httpStatus: HttpStatus.NOT_FOUND
  },
  WRONG_EMAIL_OR_PASSWORD: {
    error: 'WRONG_EMAIL_OR_PASSWORD',
    message: 'Email hoặc mật khẩu không đúng',
    httpStatus: HttpStatus.BAD_REQUEST
  },
  EMAIL_ALREADY_EXIST: {
    error: 'EMAIL_ALREADY_EXIST',
    message: 'Email đã được sử dụng',
    httpStatus: HttpStatus.BAD_REQUEST
  },
  CUSTOMER_NOT_FOUND: {
    error: 'CUSTOMER_NOT_FOUND',
    message: 'Thông tin khách hàng không tồn tại.',
    httpStatus: HttpStatus.NOT_FOUND
  },
  NOT_ENOUGH_QUANTITY_IN_STOCK: {
    error: 'NOT_ENOUGH_QUANTITY_IN_STOCK',
    message: 'Không đủ số lượng trong kho.',
    httpStatus: HttpStatus.BAD_REQUEST
  },
  CATEGORY_ALREADY_EXIST: {
    error: 'CATEGORY_ALREADY_EXIST',
    message: 'Danh mục đã tồn tại',
    httpStatus: HttpStatus.BAD_REQUEST
  },
  CATEGORY_NAME_DUPLICATED: {
    error: 'CATEGORY_NAME_DUPLICATED',
    message: 'Tên danh mục đã tồn tại',
    httpStatus: HttpStatus.BAD_REQUEST
  },
  CATEGORY_NOT_FOUND: {
    error: 'CATEGORY_NOT_FOUND',
    message: 'Không tìm thấy danh mục',
    httpStatus: HttpStatus.BAD_REQUEST
  },
  PRODUCT_NOT_FOUND: {
    error: 'PRODUCT_NOT_FOUND',
    message: 'Không tìm thấy sản phẩm',
    httpStatus: HttpStatus.BAD_REQUEST
  },
  CART_EMPTY: {
    error: 'CART_EMPTY',
    message: 'Giỏ hàng trống. Vui lòng thêm sản phẩm.',
    httpStatus: HttpStatus.BAD_REQUEST
  },
  CART_ITEM_INVALID: {
    error: 'CART_ITEM_INVALID',
    message: 'Sản phẩm không có trong giỏ hàng.',
    httpStatus: HttpStatus.BAD_REQUEST
  },
  ORDER_NOT_FOUND: {
    error: 'ORDER_NOT_FOUND',
    message: 'Không tìm thấy đơn hàng',
    httpStatus: HttpStatus.BAD_REQUEST
  },
  ORDER_ITEMS_INVALID: {
    error: 'ORDER_ITEMS_INVALID',
    message: 'Sản phẩm không có trong giỏ hàng.',
    httpStatus: HttpStatus.BAD_REQUEST
  },
  ORDER_STATUS_INVALID: {
    error: 'ORDER_STATUS_INVALID',
    message: 'Đơn hàng không hợp lệ.',
    httpStatus: HttpStatus.BAD_REQUEST
  }
}
