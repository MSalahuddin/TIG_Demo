import { colors } from "styles/theme"

export const styles = {
    application_approval_dialog:{
        dialog:{
            view:{py:30,px:20},
            content:{marginBottom:25,marginTop:-10,},
            contentText:{fontSize:21,lineHeight:32},
            title:{fontSize:22}
        },
        buttons:{
            container:{ 
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-around',
                width:'100%' 
            },
            acceptButton:{
                backgroundColor:colors['primary/50'],
                borderColor: colors['primary/50'],
            },
            denyButton:{
                backgroundColor: 'transparent'
            },
            denyTextStyle:{
                color:colors['primary/50']
            }
        }
    }
}

