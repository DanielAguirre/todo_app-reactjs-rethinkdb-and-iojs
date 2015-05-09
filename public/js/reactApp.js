var SimpleList = React.createClass({displayName: "SimpleList",
    render: function(){
        return (
            React.createElement("span", null, 
                React.createElement("p", null, React.createElement("strong", null, "Pasos para dominar un nuevo lenguage de programación")), 
                React.createElement(SimpleListForm, null), 
                React.createElement(SimpleListRow, {simpleList: this.state.simpleList})
             )
        )
    }
})

var SimpleListRow = React.createClass({displayName: "SimpleListRow",
    render: function(){        
        var rows = this.props.simpleList;
        return (
            React.createElement("ol", null, 
                rows.map(function(element) {
                    return (
                        React.createElement("li", null, element.row)
                    );
                })
            )
        );
    }
})

var SimpleListForm = React.createClass({displayName: "SimpleListForm",
    handleListSubmit:  function(e){
        e.preventDefault()
        var item = React.findDOMNode(this.refs.task).value.trim()

        if(!item){
            return 
        }
        this.props.onListSubmit({'row':item});
        React.findDOMNode(this.refs.task).value=''        
    },
    render: function(){
        return (
            React.createElement("form", {onSubmit: this.handleListSubmit}, 
                React.createElement("input", {type: "text", ref: "task"}), 
                React.createElement("button", {type: "submit"}, " Add Task ")
            )
        )
    }
})

var SimpleListBox = React.createClass({displayName: "SimpleListBox",
    handleListSubmit:  function(task){
        $.ajax({
            type:'POST',
            url: 'api/list',
            data: task,
            dataType: 'json',
            success: function(data) {
                this.setState({simpleList: task});
            }.bind(this),
                error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString())
            }.bind(this)
        });
        return 
    },
    getInitialState: function(){
        return {
            simpleList: [
                {
                    'row':'cargando  ....'
                }
            ]
        }
    },
    componentDidMount: function() {
        $.ajax({
            url:this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({simpleList:data.tasks})
            }.bind(this),
            error:function(xhr,status,err){
                console.error(this.props.url,status,err.toString())
            }.bind(this)
        })
    },
    render:function(){
        return (
            React.createElement("span", null, 
                React.createElement("p", null, React.createElement("strong", null, "Pasos para dominar un nuevo lenguage de programación")), 
                React.createElement(SimpleListForm, {onListSubmit: this.handleListSubmit}), 
                React.createElement(SimpleListRow, {simpleList: this.state.simpleList})
             )
            )
    }
})

React.render(
    React.createElement(SimpleListBox, {url: "api/list"}),    
    document.getElementById('simpleList')
)