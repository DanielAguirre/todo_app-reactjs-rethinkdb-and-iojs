var SimpleList = React.createClass({displayName: "SimpleList",
    getInitialState: function(){
        console.log('initial')
        return {
            simpleList: [
                {
                    'row':'cargando   ....'
                }
            ]
        }
    },
    componentDidMount: function(){
        $.ajax({
            url:this.props.url,
            dataType: 'json',
            success: function(data){
                console.log("data",data.tasks)
                this.setState({simpleList:data.tasks})
            }.bind(this),
            error:function(xhr,status,err){
                console.error(this.props.url,status,err.toString())
            }.bind(this)
        })
    },
    render: function(){
        return (
            React.createElement("span", null, 
                React.createElement("p", null, React.createElement("strong", null, "Pasos para dominar un nuevo lenguage de programación")), 
                React.createElement(SimpleListRow, {simpleList: this.state.simpleList})
             )
        )
    }
})

var SimpleListRow = React.createClass({displayName: "SimpleListRow",
    render: function(){
        console.log(this.props)
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
    handleSubmit:  function(e){
        e.preventDefault();
        var item = React.findDome(this.refs.task).value.trim()

        if(!item){
            return 
        }

        React.findDOMNode(this.ref.task).value=''
        return 
    }
})

React.render(
    React.createElement(SimpleList, {url: "api/list"}),
    document.getElementById('simpleList')
)

