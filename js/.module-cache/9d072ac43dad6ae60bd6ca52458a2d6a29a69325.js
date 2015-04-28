'use strict'

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
                this.setState({simpleList:data})
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
        var rows = this.props.simpleList;
        return (
            React.createElement("ol", null, 
                React.createElement("li", null, elementt.row)
            )
        );
    }
})

React.render(
    React.createElement(SimpleList, {url: "SimpleList_data.json"}),
    document.getElementById('simpleList')
)