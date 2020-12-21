import {ListCol, TableListItem} from './index';

export default function OrderProductItem({product, index}) {
	return (
		<TableListItem>
			<ListCol>{index + 1}</ListCol>
			<ListCol accent="high">{product.name}</ListCol>
			<ListCol accent="medium">{product.price} грн.</ListCol>
			<ListCol>{product.count} шт.</ListCol>
		</TableListItem>
	)
}