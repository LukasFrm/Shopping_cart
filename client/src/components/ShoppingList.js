import React, { Component } from "react";
import {
	Container,
	ListGroup,
	ListGroupItem,
	Button,
	Spinner
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import ItemModal from "../components/ItemModal";

class ShoppingList extends Component {
	componentDidMount() {
		this.props.getItems();
		console.log(this.props);
	}

	onDeleteClick = id => {
		this.props.deleteItem(id);
	};

	render() {
		const { items } = this.props.item;
		return (
			<Container>
				<ItemModal />
				{this.props.item.loading && <Spinner color="primary" />}
				<ListGroup>
					<TransitionGroup className="shopping-list">
						{items.map(({ _id, name }) => (
							<CSSTransition key={_id} timeout={200} classNames="fade">
								<ListGroupItem>
									<Button
										className="remove-btn"
										color="danger"
										size="sm"
										onClick={() => this.onDeleteClick(_id)}
									>
										<FontAwesomeIcon icon={faMinus} />
									</Button>
									{name}
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
			</Container>
		);
	}
}

ShoppingList.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ item: state.item });

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
