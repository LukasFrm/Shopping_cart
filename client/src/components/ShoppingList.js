import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";
import PropTypes from "prop-types";

class ShoppingList extends Component {
	componentDidMount() {
		// this.props.getItems();
		console.log(this.props)
	}

	render() {
		const { items } = this.props.item;
		return (
			<Container>
				<Button
					color="dark"
					style={{ marginBottom: "2rem" }}
					onClick={() => {
						const name = prompt("Enter Item");
						if (name) {
							this.setState(state => ({
								items: [...state.items, { id: uuid(), name }]
							}));
						}
					}}
				>
					Add Item
				</Button>

				<ListGroup>
					<TransitionGroup className="shopping-list">
						{items.map(({ id, name }) => (
							<CSSTransition key={id} timeout={200} classNames="fade">
								<ListGroupItem>
									<Button
										className="remove-btn"
										color="danger"
										size="sm"
										onClick={() => {
											this.setState(state => ({
												items: state.items.filter(item => item.id !== id)
											}));
										}}
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

export default connect(mapStateToProps, { getItems })(ShoppingList);
