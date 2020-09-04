import React, { useState } from 'react'

export default function SendTags (props) {
    const [recipients, updateRecipients] = useState("");
    const [qualifier, updateQualifier] = useState("AND");
    const [sendTo, updateSendTo] = useState("");
    const [sendType, updateSendType] = useState("organizationId");
    const [sent, updateSent] = useState(false);

    const matchAND = (recipient, matchList) => {
        // Must match all terms in matchList to return recipient
        const matchGoal = matchList.length;
        let matches = 0;

        for(let i = 0; i < matchGoal; i++) {
            if( recipient[ sendType ].toLowerCase().includes( matchList[i].toLowerCase() ) ) matches++;
        }

        if( matches === matchGoal ) return `${recipient.firstName} ${recipient.lastName}`;
    }

    const matchOR = (recipient, matchList) => {
        // Must match single term in matchList to return recipient
        for(let i = 0; i < matchList.length; i++) {
            if( recipient[ sendType ].toLowerCase().includes( matchList[i].toLowerCase() )) {
                return `${recipient.firstName} ${recipient.lastName}`;
            }
        }
    }
    
    const handleChange = event => {
        const value = event.target.value;

        switch(event.target.name) {
            case "sendType":
                updateSendType(value);
                return
            case "sendTo":
                updateSendTo(value);
                return
            case "qualifier":
                updateQualifier(value);
                return
            default:
                return;
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        /*  implement me
            hint: we will probably need to update state here to render the right parts
        */
       const matchList = sendTo.split(',');

       // Filter list of all recipients down to input matches
       const filteredResult = props.recipientsList.map( recipient => { 
           switch( qualifier ) {
               case "AND":
                  return matchAND( recipient, matchList );
               case "OR":
                  return matchOR( recipient, matchList );
               default:
                   return;
           }
       })
       .filter( recipient => recipient !== undefined );

       // Determine if any recipients were found and update sent state accordingly
       if( filteredResult.length ) {
          updateRecipients( filteredResult.join(', ') );
          updateSent( true );
       } else {
          updateRecipients( filteredResult.join(', ') );
          updateSent( false );
       }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} style={{textAlign: "left"}}>
                <label style={{paddingRight: "10px"}}>
                    <div>
                        <span style={{ paddingRight: "10px" }}>Send Type:</span>
                        <select name="sendType" onChange={handleChange}>
                            <option value="organizationId">Organization</option>
                            <option value="firstName">First Name</option>
                            <option value="lastName">Last Name</option>
                            <option value="tags">Tags</option>
                        </select>
                    </div>
                    <div>
                        <span style={{ paddingRight: "10px" }}>Send To (separated by commas):</span>
                        <input type="text" name="sendTo" onChange={handleChange}/>
                    </div>
                    <div>
                        <span style={{ paddingRight: "10px" }}>AND/OR?: </span>
                        <select name="qualifier" onChange={handleChange}>
                            <option value="AND">And</option>
                            <option value="OR">Or</option>
                        </select>
                    </div>
                </label>
                <input type="submit" value="Send Messages" />
            </form>
            { sent && <div>Sent to: {typeof recipients === "string" ? recipients : "Type Error"}</div> }
        </div>
    )
}