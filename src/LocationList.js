import React from 'react'

class LocationList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    render() {

        return (
            <div>
            <input 
            id='input' 
            type='text' 
            placeholder='Enter a beach' 
            value={this.state.query}
            onChange={e=>this.props.updateQuery(e.target.value)}
            />
            <ul>
            {this.props.workingList.map( location =>
            <li data-key={location.id} key={location.id} role="button" 
            onClick={e=>this.props.handleClick(e)}> 
            {location.name} 
            </li>
            )}
            </ul>
            </div>
        );
    }
}

export default LocationList
/*
[
    {"name":"Kini", "location":{"lat": 37.4461269, "lng": 24.90025730000002}, "id":"798b52d953c5fc3650de30bed68a116594a7d699"},
    {"name":"Galissas", "location":{"lat": 37.4221006, "lng": 24.87788820000003}, "id":"82318640d39513894d363b15a1a69e4e1d478091"},
    {"name":"Armeos", "location":{"lat": 37.4195189, "lng": 24.874082600000065},"id":"d1fc96d31a3e96fa2a234d825d6dfbd122e35a52"},
    {"name":"Voulgari", "location":{"lat": 37.3926852, "lng": 24.884587399999987},"id":"c34caeb5f97fbad3da67409a8aefd14342a43d0c"},
    {"name":"Delfini", "location":{"lat": 37.4583922, "lng": 24.8985189},"id":"88d30d9e422e0f4fcc9a203c2fd647c0e366a4b6"},
    {"name":"Ahladi", "location":{"lat": 37.3880696, "lng": 24.940544700000032},"id":"b744c996c4f31646f25af3ebef7662c31259bd82"},
    {"name":"Azolimnos", "location":{"lat": 37.4102735, "lng": 24.96399930000007},"id":"97437c188f7db5abc5c37ef4410c09479b17d045"},
    {"name":"Fabrika", "location":{"lat": 37.3919399, "lng": 24.952984600000036},"id":"1dfb284f5a576a12e7f9e197fb333e6629ca1eed"},
    {"name":"Grammata", "location":{"lat": 37.4989744, "lng": 24.895487799999955},"id":"f7c2cf1a791e7ebc9389bfa0dbe4af2b788e570c"},
    {"name":"Kokkina", "location":{"lat": 37.3951236, "lng": 24.87074080000002},"id":"78d59526204d118c365fee38f7f32792086b5db8"},
    {"name":"Varvarousa", "location":{"lat": 37.4682799, "lng": 24.896308699999963},"id":"901414ad5824f4a95c26a734698a907b4acf7cf9"},
    {"name":"Vari", "location":{"lat": 37.3901063, "lng": 24.945533299999965},"id":"358d2a5fc34fdb53d8edb1948f81cb460d7c8b6c"},
    {"name":"Foinikas", "location":{"lat": 37.397091, "lng": 24.881677800000034},"id":"a8821da1b81280f17df06133909e6fb49f06dba3"},
    {"name":"Asteria", "location":{"lat": 37.4466131, "lng": 24.947524899999962},"id":"ed04ae997e854c4abc8bc264a282e68991cb6e42"},
    {"name":"Lotos", "location":{"lat": 37.4432608, "lng": 24.896032699999978},"id":"cd180055bb128ca4c0c0b8f67a9f47e05dd819b4"},
    {"name":"Lia", "location":{"lat": 37.4892461, "lng": 24.901578500000028},"id":"61f4dfa1d131a4f0207a8a99d144e23110e9caac"},
    {"name":"Abela", "location":{"lat": 37.376455, "lng": 24.90597260000004},"id":"f6bd76d2ad176025c99df8c9f8e61763eb93f8e4"},
    {"name":"Aetos", "location":{"lat": 37.4728912, "lng": 24.90186189999997},"id":"61d822882b4606c59ed3db75715d8c4c36ed872e"},
    {"name":"Agathopes", "location":{"lat": 37.3854249, "lng": 24.880986099999973},"id":"df737f051af3732c153c0330dd90dc030cfb1e48"}

    */