using System.Text.Json.Serialization;

namespace FranceTravail.Entities.FranceTravailAPI
{
    /// <summary>
    /// Information received by api about OAuth2 authentication
    /// </summary>
    /// <remarks>
    /// For more information, see : 
    /// https://francetravail.io/produits-partages/documentation/utilisation-api-france-travail/generer-access-token
    /// </remarks>
    public class OAuth2
    {
        [JsonPropertyName("scope")]
        public string Scope { get; set; }

        [JsonPropertyName("expires_in")]
        public int ExpiresIn { get; set; }

        [JsonPropertyName("token_type")]
        public string TokenType { get; set; }

        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; }
    }
}
