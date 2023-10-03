package com.taskmanager.taskmanagerapi.Auth.Jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "0K8rO/sAqGQWppHq0/05JPy3X9RsPJ574rg6gQSXCROUm83OzhifLEF9WcHnPV4XdDOLWFIKvlh0WsirGttY57V0lyarEhkkm/2yKaelEXw=";

    // Service in charge of jwt token generation
    public String getToken(UserDetails user) {
        return getToken(new HashMap<>(), user);
    }

    public String getToken(Map<String, Object> extraClaims, UserDetails user) {
        // Create the jwt with the Jwts library
        // The expiration of the JWT token is setted for a day
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1080*60*24))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();


    }

    private Key getKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String getUsernameFromToken(String jwtToken) {
        return getClaims(jwtToken, Claims::getSubject);
    }

    public boolean isTokenValid(String jwtToken, UserDetails userDetails) {
        // Check if the username and the user of the token are the same
        final String username = getUsernameFromToken(jwtToken);

        if(username.equals(userDetails.getUsername()) && !isTokenExpired(jwtToken)){
            return true;
        }
        return false;
    }

    private Claims getAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public <T> T getClaims(String token, Function<Claims, T> claimsResolv){
        final Claims claims = getAllClaims(token);
        return claimsResolv.apply(claims);
    }

    private Date getExpDate(String token){
        return getClaims(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token){
        return getExpDate(token).before(new Date());
    }
}
