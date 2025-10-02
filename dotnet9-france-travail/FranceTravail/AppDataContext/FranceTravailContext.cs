using System.Text.Json;
using FranceTravail.Entities.FranceTravailAPI;
using FranceTravail.Settings;

namespace FranceTravail.AppDataContext
{
    /// <summary>
    /// Connection to FranceTravailAPI
    /// </summary>
    public class FranceTravailContext
    {
        private string _clientId;
        private string _clientSecret;
        public string BearerToken = "";

        public FranceTravailContext()
        {
            var settings = new AppSettings();
            _clientId = settings.ClientId;
            _clientSecret = settings.ClientSecret;
        }

        /// <summary>
        /// Authenticate to the API with those variables from settings to work :
        /// - client_id 
        /// - client_secret
        /// When connected, stored the Bearer Token into the local variable : BearerToken
        /// </summary>
        /// <returns>State of connection, True when connection established</returns>
        public async Task<bool> Authenticate()
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, "https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=/partenaire");
            var collection = new List<KeyValuePair<string, string>>
            {
                 new("grant_type", "client_credentials"),
                 new("client_id", _clientId),
                 new("client_secret", _clientSecret),
                 // Only use this feature of API
                 new("scope", "o2dsoffre api_offresdemploiv2")
            };
            var content = new FormUrlEncodedContent(collection);
            request.Content = content;

            try
            {
                var response = await client.SendAsync(request);
                response.EnsureSuccessStatusCode();
                var result = await response.Content.ReadAsStringAsync();
                var oauth2Response = JsonSerializer.Deserialize<OAuth2>(result);
                BearerToken = $"{oauth2Response.TokenType} {oauth2Response.AccessToken}";
                Console.WriteLine($"Connection Successfull: {BearerToken}");
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine($"Une erreur s'est produite lors de la requête : {e.Message}");
            }
            catch (JsonException e)
            {
                Console.WriteLine($"Erreur de désérialisation : {e.Message}");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Une erreur inattendue s'est produite : {e.Message}");
            }

            return !string.IsNullOrEmpty(BearerToken);
        }
    }
}
