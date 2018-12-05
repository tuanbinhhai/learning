<template>
  <div id="appfooter">
        <div class="container">
            <div class="row">
                <div class="col-md-3 myCols">
                    <h5>Networks</h5>
                    <ul class='social-networks'>
                        <li><a href="fb.com" class="facebook"><i class="fa fa-facebook-official"></i>Facebook</a></li>
                        <li><a href="twitter.com" class="twitter"><i class="fa fa-twitter"></i>Twitter</a></li>
                        <li><a href="google.com" class="google"><i class="fa fa-google-plus-square"></i>Google</a></li>
                        <li><a href="youtube.com" class="youtube"><i class="fa fa-youtube-play"></i>Youtube</a></li>
                    </ul>
                </div>
                <div class="col-md-3 myCols">
                    <h5>Customer Support</h5>
                    <ul>
                        <li><router-link to="home">Support Center</router-link></li>
                        <li><router-link to="home">Safe Sell</router-link></li>
                        <li><router-link to="home">Rules</router-link></li>
                    </ul>
                </div>
                <div class="col-md-3 myCols">
                    <h5>About Muaxedi</h5>
                    <ul>
                        <li><router-link to="home">About Us</router-link></li>
                        <li><router-link to="home">Career</router-link></li>
                        <li><router-link to="home">Media</router-link></li>
                    </ul>
                </div>
                <div class="col-md-3 myCols">
                    <h5>Verify</h5>
                    <ul>
                        <li><router-link to="home">Term of Service</router-link></li>
                        <li><router-link to="home">Term of use</router-link></li>
                        <li><router-link to="home">Privacy Policy</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <p>© 20178 Copyright by Sherpa team's (Demo)</p>
        </div>
  </div>
</template>

<script>

export default {
  name: 'appfooter',
  data () {
    return {

    }
  }
}
</script>

<style>
#appfooter {
	background-color: #ffffff;
}
#appfooter .footer-copyright{
	background-color: #383737;
	padding-top:3px;
	padding-bottom:3px;
	text-align: center;
}
#appfooter .footer-copyright p{
	margin:10px;
	color: #ccc;
  text-align: center;
}
#appfooter ul{
	list-style-type: none;
  padding-left: 0;
  line-height: 1.7;
}
#appfooter h5{
	font-size: 18px;
  color: #000000;
  font-weight: bold;
  margin-top: 30px;
}
#appfooter a{
	color:#000000;
	text-decoration: none;
}
#appfooter a:hover, #appfooter a:focus{
	text-decoration: none;
	color: #f49c20;
}
#appfooter .myCols{
	text-align: left;
}
#appfooter .social-networks a:hover{
	text-decoration: none;
  transition: 0.5s;
}
#appfooter .facebook:hover{
	color:#0077e2;
}
#appfooter .google:hover{
	color:#ef1a1a;
}
#appfooter .twitter:hover{
	color: #00aced;
}
#appfooter .youtube:hover{
	color: #FF0000;
}
@media screen and (max-width: 767px){
  #appfooter ul{
    font-size: 10px;
  }
  #appfooter .myCols{
    text-align: center;
  }
  #appfooter h5{
    font-size: 12px;
  }
}
</style>
