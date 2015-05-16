var wait, _methods = {}, _comments = [], Store, Actions, Flux = new McFly();
//initiation of db
localforage.setDriver([localforage.INDEXEDDB, localforage.LOCALSTORAGE]);
//retrieving data from db
wait = setInterval(function(){
	localforage.getItem('comments').then(function(value) {
		if(value!=null) {
		    value.forEach(function(el){
		    	if(el!=null) {
					Actions.addComment(el,false);
					_comments.push(el);
		    	}
		    });
			clearInterval(wait);
		}
	});
},100);
//creating flux components
Store = Flux.createStore({
	getComments:function(){
		return _comments;
	}
},function(payload){
	switch(payload.actionType){
		case 'ADD_COMMENT':
			_methods.addComment(payload.commentData, payload.state);
			Store.emitChange();	
		break;
	}
});

Actions = Flux.createActions({
	addComment:function(commentData, state){
		return {
			actionType: 'ADD_COMMENT',
			commentData: commentData,
			state:state
		};
	}
});
//add comment to db
_methods.addComment = function(commentData,state){
	
	_comments.push(commentData);

	if(state)
		localforage.setItem('comments', _comments);
}
//getimg all comments
_methods.getComments = function(){
	return Store.getComments();
}
//form
var CommentForm = React.createClass({
	saveComment:function(e){
		e.preventDefault();
		var id, name, email, text, data, notEmpty = false;
		id = ++_methods.getComments().length;
		name = React.findDOMNode(this.refs.name).value;
		email = React.findDOMNode(this.refs.email).value;
		text = React.findDOMNode(this.refs.text).value;

		if(name.length>0 && email.length>0 && text.length>0)
			notEmpty = true;
		else
			notEmpty = false;

		if (notEmpty) {
			data = {
				id:id,
				author:name,
				email:email,
				text:text
			};
			Actions.addComment(data, true);
			this.clearFields();
		}
	},
	clearFields:function(){
		React.findDOMNode(this.refs.name).value="";
		React.findDOMNode(this.refs.email).value="";
		React.findDOMNode(this.refs.text).value="";
	},
	render:function(){
		return (
				<form id="add-comment-form" onSubmit={this.saveComment}>
					<h3>Share your opinion</h3>
					<p><input className="comment-input" type="text" maxlength="20" ref="name" required placeholder="Enter your name" />
					<input className="comment-input" type="email" ref="email" required placeholder="Enter your email" /></p>
					<p><textarea id="comment-area" ref="text" required placeholder="Enter your comment here" /></p>
					<p><input id="comment-btn" type="submit" value="Publish" /></p>
				</form>
			);
	}
});

//main component
var Comments = React.createClass({
	mixins:[Store.mixin],
	getInitialState:function(){
		return {comments: _methods.getComments()};
	},
	storeDidChange: function() {
        this.setState({cats: _methods.getComments()});
    },
	render:function(){
		var comments, state = this.state.comments;
		if(state.length>0){
			comments = state.map(function(comment){
				return (
					<div key={comment.id} id={"com-"+comment.id} className="comment">
						<p data-author={comment.author} className="comment-content">{comment.text}</p>
					</div>
				);
			});	
		}else
			comments = <h4>There is no comments :(</h4>;

		return (
			<div>
				{comments}

				<CommentForm />
			</div>
			);
	}
});

React.render(<Comments/>, document.querySelector('.comment-block'));