'use strict'

var SimpleListRow = React.createClass({
    render: function(){
        var rows = this.props.simpleList;
        return (
            <ol>
                <li>{elemt.row}</li>
            </lo>
        )
    }
})

var SimpleList = React.createClass({
    getInitialState: function(){
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
            success: function(date_timeta){
                this.setState({})
            }.bind(this),
            error:function(xhr,status,err){
                console.error(this.props-url,status,err.toString())
            }.bind(this)
        })
    }
    render: function(){
        return (
            <span>
                <p><strong>
                    Pasos para dominar un nuevo lenguage de programación
                </strong></p>
             </span>
        )
    }

    React.render(
        <SimpleList url='SimpleList_data.json'>
        document.getElementById('simpleList')
    )
})
